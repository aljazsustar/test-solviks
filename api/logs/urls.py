from django.urls import path, include

from logs.views import ListCreateLogView, UpdateDeleteGetLogView, StatsView

urlpatterns = [
    path('projects/<int:pk>/logs/', ListCreateLogView.as_view(), name='list_create_log'),
    path('projects/<int:pk>/logs/<int:log_pk>/', UpdateDeleteGetLogView.as_view(), name='update_delete_get_log'),
]
