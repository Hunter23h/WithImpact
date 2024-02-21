from django.db import models
from django.contrib.postgres.fields import ArrayField


# Template Model for the database
# class MyModel(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.TextField()


class Project(models.Model):
    id = models.AutoField(primary_key=True, serialize=True)
    name = models.TextField()
    owner = models.TextField()
    owner_avatar = models.TextField()
    repo_url = models.TextField(unique=True)
    created_date = models.TextField()
    updated_date = models.TextField()
    description = models.TextField()
    last_push_date = models.TextField()
    latest_commit_date = models.TextField()
    stars = models.BigIntegerField()
    forks = models.BigIntegerField()
    watchers = models.BigIntegerField()
    languages = models.JSONField()
    tags = models.JSONField()
    open_prs = models.IntegerField()
    open_issues = models.IntegerField()
    top_contributors = models.JSONField()
    status = models.CharField(max_length=20)
    newcomer_friendly = models.BooleanField(default=False)
    sdg_categories = models.JSONField(null=True)
    readme = models.TextField(null=True)


class User(models.Model):
    #id = models.AutoField(primary_key=True, serialize=True)
    # email = models.EmailField()
    username = models.TextField(unique=True, primary_key=True)
    favourite_projects = models.JSONField(null=True)

class Comment(models.Model):
    id = models.AutoField(primary_key=True, serialize=True)
    project_url = models.TextField()
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    avatar_url = models.TextField()


