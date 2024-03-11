from rest_framework import serializers
from .models import User, Project, Comment
from rest_auth.models import TokenModel


class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["name", "owner", "owner_avatar", "repo_url", "created_date", "updated_date", "description",
                  "last_push_date", "latest_commit_date", "stars", "forks", "watchers",
                  "languages", "tags", "open_prs", "open_issues", "top_contributors",
                  "status", "newcomer_friendly", "sdg_categories", "readme"]

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "favourite_projects"]

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "project_url", "username", "text", "created_date", "avatar_url"]
