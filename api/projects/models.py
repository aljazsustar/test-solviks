from django.db import models


class Project(models.Model):
    tile = models.CharField(max_length=255)
