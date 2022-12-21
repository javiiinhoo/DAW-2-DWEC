from django.contrib import admin

from .models import Dashboard, Question, Answer

admin.site.register(Dashboard)
admin.site.register(Question)
admin.site.register(Answer)
