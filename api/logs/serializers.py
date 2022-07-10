from rest_enumfield import EnumField
from rest_framework import serializers

from logs.models import Log, LOG_SEVERITY_CHOICES


class LogSerializer(serializers.ModelSerializer):

    severity_level = serializers.ChoiceField(choices=LOG_SEVERITY_CHOICES)

    class Meta:
        model = Log
        fields = ['id', 'timestamp', 'severity_level', 'source', 'project', 'content']
