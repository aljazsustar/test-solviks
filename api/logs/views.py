import datetime

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from logs.models import Log
from logs.serializers import LogSerializer


class ListCreateLogView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['severity_level', 'source']
    search_fields = ['content']
    ordering_fields = ['severity_level', 'id', 'timestamp']

    def get_queryset(self):
        return Log.objects.filter(project_id=self.kwargs['pk']).all()


class UpdateDeleteGetLogView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Log.objects.all()
    serializer_class = LogSerializer

    def get_queryset(self):
        return Log.objects.filter(project_id=self.kwargs['pk'], id=self.kwargs['log_pk']).all()


class StatsView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        res = {}
        res['logs_last_24h'] = Log.objects.filter(timestamp__gte=datetime.datetime.now() - datetime.timedelta(days=1)).count()
        res['logs_last_1h'] = Log.objects.filter(timestamp__gte=datetime.datetime.now() - datetime.timedelta(hours=1)).count()

        by_severity = {}
        by_severity['emergency'] = Log.objects.filter(severity_level=0).count()
        by_severity['alert'] = Log.objects.filter(severity_level=1).count()
        by_severity['critical'] = Log.objects.filter(severity_level=2).count()
        by_severity['error'] = Log.objects.filter(severity_level=3).count()
        by_severity['warning'] = Log.objects.filter(severity_level=4).count()
        by_severity['notice'] = Log.objects.filter(severity_level=5).count()
        by_severity['informational'] = Log.objects.filter(severity_level=6).count()
        by_severity['debug'] = Log.objects.filter(severity_level=7).count()

        res['by_severity'] = by_severity

        return Response(status=200, content_type='application/json', data=res)
