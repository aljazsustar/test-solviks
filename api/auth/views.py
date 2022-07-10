from django.contrib.auth.models import User
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserSerializer


class ListCreateUserView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return super().post(request, args, kwargs)

        return Response(status=401, data={'error': 'only superuser can register users'})

