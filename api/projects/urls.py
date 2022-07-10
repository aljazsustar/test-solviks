from django.urls import path

from projects.views import ListCreateProjectView, UpdateDeleteGetProjectView, ExportToExcelView
from logs.views import ListCreateLogView, UpdateDeleteGetLogView

urlpatterns = [
    path('', ListCreateProjectView.as_view(), name='list_create_project'),
    path('<int:pk>/', UpdateDeleteGetProjectView.as_view(), name='update_delete_get_project'),
    path('<int:pk>/logs/', ListCreateLogView.as_view(), name='list_create_log'),
    path('<int:pk>/logs/<int:log_pk>/', UpdateDeleteGetLogView.as_view(), name='update_delete_get_log'),
    path('<int:pk>/logs/export/', ExportToExcelView.as_view(), name='export')
]
