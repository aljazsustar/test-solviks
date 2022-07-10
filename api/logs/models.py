from enum import Enum

import django.utils.timezone

from django.db import models

from projects.models import Project

LOG_SEVERITY_CHOICES = (
    (0, "Emergency"),
    (1, "Alert"),
    (2, "Critical"),
    (3, "Error"),
    (4, "Warning"),
    (5, "Notice"),
    (6, "Informational"),
    (7, "Debug")
)


class Log(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    severity_level = models.IntegerField(choices=LOG_SEVERITY_CHOICES)
    source = models.CharField(max_length=255, blank=False, null=False)
    content = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
