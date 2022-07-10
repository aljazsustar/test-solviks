from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        u = User(username=validated_data.pop('username'))
        u.set_password(validated_data.pop('password'))
        u.save()
        return u
