from django.db import models

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
	created_datetime = models.DateTimeField(auto_now=True) 

	def save(self, *args, **kwargs):
		self.child_id = len(Answer.objects.filter(question=self.question)) + 1
		super(Answer, self).save(*args, **kwargs)

