from django.contrib import admin

from .models import Dashboard, Question, Answer, CustomUser, UserSession

admin.site.register(Dashboard)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(CustomUser)
admin.site.register(UserSession)
