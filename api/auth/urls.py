from django.urls import path, include

from auth.views import ListCreateUserView

urlpatterns = [
    path('register/', ListCreateUserView.as_view(), name='list_create_user'),
]
