from django.db import models

class CustomUser(models.Model):
	id = models.AutoField(primary_key=True, editable=False)
	username = models.CharField(unique=True, max_length=50)
	encrypted_password = models.CharField(max_length=100)

	def __str__(self):
		return self.username

class UserSession(models.Model):
	id = models.AutoField(primary_key=True, editable=False)
	user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
	token = models.CharField(unique=True, max_length=20)

	def __str__(self):
		return str(self.user) + ' - ' + self.token 

class Dashboard(models.Model):
	id = models.AutoField(primary_key=True, editable=False)
	title = models.CharField(max_length=200)
	description = models.CharField(max_length=1000)
	last_updated = models.DateTimeField()

	def __str__(self):
		return self.title

class Question(models.Model):
	id = models.AutoField(primary_key=True, editable=False)
	dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE)
	child_id = models.IntegerField(editable=False)
	title = models.CharField(max_length=100)
	description = models.CharField(max_length=3000)
	author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
	created_datetime = models.DateTimeField(auto_now=True)

	def save(self, *args, **kwargs):
		self.child_id = len(Question.objects.filter(dashboard=self.dashboard)) + 1
		super(Question, self).save(*args, **kwargs)

	def __str__(self):
		return self.title

class Answer(models.Model):
	id = models.AutoField(primary_key=True, editable=False)
	question = models.ForeignKey(Question, on_delete=models.CASCADE)
	child_id = models.IntegerField(editable=False)
	description = models.CharField(max_length=1000)
	author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
	created_datetime = models.DateTimeField(auto_now=True) 

	def save(self, *args, **kwargs):
		self.child_id = len(Answer.objects.filter(question=self.question)) + 1
		super(Answer, self).save(*args, **kwargs)
