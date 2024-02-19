from rest_framework import serializers
from .models import User, Project
from rest_auth.models import TokenModel
# from rest_auth.utils import import_callable
# from rest_auth.serializers import UserDetailsSerializer



# class MyModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MyModel
#         fields = ["id", "name", "description"]


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
        fields = ["email", "username", "favourite_projects"]

# class TokenSerializer(serializers.ModelSerializer):
#     user = UsersSerializer(read_only=True)

#     class Meta:
#         model = TokenModel
#         fields = ('key', 'user', )
