import tablib
from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from logs.models import Log
from projects.models import Project
from projects.serializers import ProjectSerializer


class ListCreateProjectView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class UpdateDeleteGetProjectView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ExportToExcelView(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        logs = Log.objects.filter(project_id=kwargs['pk']).all()
        headers = ('Timestamp', 'Severity', 'Source', 'Content')
        data = [(log.timestamp.timestamp().__str__(), log.severity_level, log.source, log.content) for log in logs]
        to_export = tablib.Dataset(*data, headers=headers)
        response = HttpResponse(to_export.export('xlsx'), content_type='application/vnd.ms-excel;charset=utf-8')
        response['Content-Disposition'] = "attachment; filename=export.xls"

        return response
