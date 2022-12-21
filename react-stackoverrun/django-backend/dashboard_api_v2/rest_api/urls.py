from django.urls import path

from . import facade_v2

urlpatterns = [
	path('dashboards', facade_v2.dashboards),
	path('dashboards/<int:id>', facade_v2.dashboard_by_id),
	path('dashboards/<int:dashboard_id>/questions/<int:question_id>', facade_v2.question_by_id),
	path('dashboards/<int:dashboard_id>/questions', facade_v2.post_new_question),
	path('dashboards/<int:dashboard_id>/questions/<int:question_id>/answers', facade_v2.post_new_answer),
	path('users', facade_v2.register),
	path('sessions', facade_v2.login),
	path('sessions/<int:id>', facade_v2.logout),
]
