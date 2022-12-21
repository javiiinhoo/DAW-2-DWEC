from datetime import datetime
from django.db.models import Q
from django.http import JsonResponse
from django.utils.timezone import make_aware, now, utc
from django.views.decorators.csrf import csrf_exempt
from .models import Dashboard, Question, Answer, CustomUser, UserSession
import bcrypt, json, secrets

SESSION_TOKEN_HEADER='Session-Token'

def dashboards(request):
	if request.method != 'GET':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	response = []
	for dashboard in Dashboard.objects.all():
		json = {'id': dashboard.id, 'title': dashboard.title, 'description': dashboard.description, 'last_updated':dashboard.last_updated.timestamp() }
		response.append(json)
	return JsonResponse(response, safe=False, status=200)

def dashboard_by_id(request, id):
	if request.method != 'GET':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	questions_response = []
	dashboard = Dashboard.objects.get(id=id)
	# HTTP Query search params
	search = request.GET.get('search', None)
	older_than = __timestamp_to_utc(request.GET.get('older_than', now().timestamp())) # Defaults to now()
	page_size = request.GET.get('page_size', 10) # Defaults to 10
	# Prepare the query
	print(older_than)
	db_query = dashboard.question_set.filter(created_datetime__lt=older_than)
	if search is not None:
		db_query = db_query.filter(Q(title__icontains=search) | Q(description__icontains=search))
	db_query = db_query.order_by('-created_datetime')
	# Execute and create JSON from database results
	for question in db_query[:int(page_size)]:
		json = {'question_id': question.child_id, 'title': question.title, 'description': question.description, 'author': question.author.username, 'created_at': question.created_datetime.timestamp() }
		questions_response.append(json)
	response = {'title': dashboard.title, 'description': dashboard.description, 'last_updated': dashboard.last_updated.timestamp(), 'questions': questions_response }
	return JsonResponse(response, status=200) 

def question_by_id(request, dashboard_id, question_id):
	if request.method != 'GET':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	answers_response = []
	dashboard = Dashboard.objects.get(id=dashboard_id)
	question = dashboard.question_set.get(child_id=question_id)
	# HTTP Query search params
	search = request.GET.get('search', None)
	older_than = __timestamp_to_utc(request.GET.get('older_than', now().timestamp())) # Defaults to now()
	page_size = request.GET.get('page_size', 10) # Defaults to 10
	# Prepare the query
	db_query = question.answer_set.filter(created_datetime__lt=older_than)
	if search is not None:
		db_query = db_query.filter(description__icontains=search)
	db_query = db_query.order_by('-created_datetime')
	# Execute and create JSON from database results
	for answer in db_query[:int(page_size)]:
		json = {'answer_id': answer.child_id, 'description': answer.description, 'author': answer.author.username, 'created_at': answer.created_datetime.timestamp() }
		answers_response.append(json)
	response = {'dashboard_title': dashboard.title, 'question_title': question.title, 'question_author': question.author.username, 'question': question.description, 'created_at': question.created_datetime.timestamp(), 'answers': answers_response }
	return JsonResponse(response, status=200) 

@csrf_exempt
def post_new_question(request, dashboard_id):
	if request.method != 'POST':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	dashboard = Dashboard.objects.get(id=dashboard_id)
	body = json.loads(request.body)
	new_question = Question()
	new_question.dashboard = dashboard
	new_title = body.get('title', None)
	if new_title == None:
		return JsonResponse({'error': 'Missing title in request body'}, status=400)
	new_description = body.get('description', None)
	if new_description == None:
		return JsonResponse({'error': 'Missing description in request body'}, status=400)
	new_question.title = new_title
	new_question.description = new_description
	logged_user = __get_logged_user(request)
	if logged_user == None:
		return JsonResponse({'error': 'Missing session-token header for authenticating the user'}, status=401)
	new_question.author = logged_user
	new_question.save()
	# Side-effect: Update dashboard's last-updated field
	dashboard.last_updated = now()
	dashboard.save()
	return JsonResponse({'created':'True'}, status=201)

@csrf_exempt
def post_new_answer(request, dashboard_id, question_id):
	if request.method != 'POST':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	dashboard = Dashboard.objects.get(id=dashboard_id)
	question = dashboard.question_set.get(child_id=question_id)
	body = json.loads(request.body)
	new_answer = Answer()
	new_answer.question = question
	new_description = body.get('description', None)
	if new_description == None:
		return JsonResponse({'error': 'Missing description in request body'}, status=400)
	new_answer.description = new_description
	logged_user = __get_logged_user(request)
	if logged_user == None:
		return JsonResponse({'error': 'Missing session-token header for authenticating the user'}, status=401)
	new_answer.author = logged_user
	new_answer.save()
	# Side-effect: Update dashboard's last-updated field
	dashboard.last_updated = now()
	dashboard.save()
	return JsonResponse({'created':'True'}, status=201)

@csrf_exempt
def register(request):
	if request.method != 'POST':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	body = json.loads(request.body)
	new_username = body.get('username', None)
	if new_username == None:
		return JsonResponse({'error': 'Missing username in request body'}, status=400)
	try:
		CustomUser.objects.get(username=new_username)
	except CustomUser.DoesNotExist:
		# Proceed
		new_password = body.get('password', None)
		if new_password == None:
			return JsonResponse({'error': 'Missing password in request body'}, status=400)
		new_password_confirm = body.get('passwordConfirm', None)
		if new_password_confirm == None:
			return JsonResponse({'error': 'Missing password_confirm in request body'}, status=400)
		if new_password != new_password_confirm:
			return JsonResponse({'error': 'password and password_confirm do not match'}, status=400)

		encrypted_pass = bcrypt.hashpw(new_password.encode('utf8'), bcrypt.gensalt()).decode('utf8')
		new_user = CustomUser()
		new_user.username = new_username
		new_user.encrypted_password = encrypted_pass
		new_user.save()
		return JsonResponse({'created':'True'}, status=201)

	# User DOES exist.
	return JsonResponse({'error': 'User with given username already exists'}, status=409)
	
@csrf_exempt
def login(request):
	if request.method != 'POST':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	body = json.loads(request.body)
	username = body.get('username', None)
	if username == None:
		return JsonResponse({'error': 'Missing username in request body'}, status=400)
	try:
		user = CustomUser.objects.get(username=username)
	except CustomUser.DoesNotExist:
		return JsonResponse({'error': 'Username does not exist'}, status=404)
	password = body.get('password', None)
	if password == None:
		return JsonResponse({'error': 'Missing password in request body'}, status=400)
	if bcrypt.checkpw(password.encode('utf8'), user.encrypted_password.encode('utf8')):
		new_session = UserSession()
		new_session.user = user
		new_session.token = secrets.token_hex(10)
		new_session.save()
		return JsonResponse({'created':'True', 'session_id': new_session.id, 'session_token': new_session.token }, status=201)
	else:
		return JsonResponse({'error': 'Password is invalid'}, status=401)

@csrf_exempt
def logout(request, id):
	if request.method != 'DELETE':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	session = UserSession.objects.get(id=id)
	if session.token == request.headers.get(SESSION_TOKEN_HEADER, None):
		session.delete()
		return JsonResponse({'deleted':'True'}, status=200)
	else:
		return JsonResponse({'error': 'Unauthorized due to missing or invalid session-token header'}, status=401)

def __timestamp_to_utc(naive_timestamp):
	# https://stackoverflow.com/questions/12589764/unix-timestamp-to-datetime-in-django-with-timezone
	# https://github.com/django/django/blob/main/django/utils/timezone.py
	return datetime.fromtimestamp(float(naive_timestamp))

def __get_logged_user(request):
	session_token = request.headers.get(SESSION_TOKEN_HEADER, None)
	if session_token == None:
		return None
	try:
		session = UserSession.objects.get(token=session_token)
		return session.user
	except UserSession.DoesNotExist:
		return None	
