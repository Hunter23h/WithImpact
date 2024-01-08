from django.db import models
from django.contrib.postgres.fields import ArrayField


# Template Model for the database
class MyModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()


class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    tags = models.JSONField(default=list)
    sdgCategories = models.JSONField(default=list)
