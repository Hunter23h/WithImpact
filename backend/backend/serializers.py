from rest_framework import serializers
from .models import MyModel, Project


class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = ["id", "name", "description"]


class ProjectsSerializer(serializers.ModelSerializer):
    class Data:
        model = Project
        fields = ["id", "name", "description", "tags", "sdgCategories"]
