from django.http import JsonResponse
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt
from .models import Dashboard, Question, Answer
import json

def dashboards(request):
	if request.method != 'GET':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	response = []
	for dashboard in Dashboard.objects.all():
		json = {'id': dashboard.id, 'title': dashboard.title, 'description': dashboard.description, 'last_updated':dashboard.last_updated}
		response.append(json)
	return JsonResponse(response, safe=False, status=200)

def dashboard_by_id(request, id):
	if request.method != 'GET':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	dashboard = Dashboard.objects.get(id=id)
	questions_response = []
	for question in dashboard.question_set.all():
		json = {'question_id': question.child_id, 'title': question.title, 'description': question.description, 'created_at': question.created_datetime }
		questions_response.append(json)
	response = {'title': dashboard.title, 'description': dashboard.description, 'last_updated': dashboard.last_updated, 'questions': questions_response }
	return JsonResponse(response, status=200) 

def question_by_id(request, dashboard_id, question_id):
	if request.method != 'GET':
		return JsonResponse({'error':'Unsupported HTTP method'}, status=405)
	dashboard = Dashboard.objects.get(id=dashboard_id)
	question = dashboard.question_set.get(child_id=question_id)
	answers_response = []
	for answer in question.answer_set.all():
		json = {'answer_id': answer.child_id, 'description': answer.description, 'created_at': answer.created_datetime }
		answers_response.append(json)
	response = {'dashboard_title': dashboard.title, 'question_title': question.title, 'question': question.description, 'created_at': question.created_datetime, 'answers': answers_response }
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
	new_answer.save()
	# Side-effect: Update dashboard's last-updated field
	dashboard.last_updated = now()
	dashboard.save()
	return JsonResponse({'created':'True'}, status=201)

