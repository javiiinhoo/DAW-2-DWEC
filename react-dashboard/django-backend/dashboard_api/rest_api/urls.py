from django.urls import path

from . import facade

urlpatterns = [
	path('dashboards', facade.dashboards),
	path('dashboards/<int:id>', facade.dashboard_by_id),
	path('dashboards/<int:dashboard_id>/questions/<int:question_id>', facade.question_by_id),
	path('dashboards/<int:dashboard_id>/questions', facade.post_new_question),
	path('dashboards/<int:dashboard_id>/questions/<int:question_id>/answers', facade.post_new_answer),
]
