from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, get_object_or_404,redirect
from .models import User, Project
from .forms import CommentForm
import json

# from .serializers import MyModelSerializer
from django.http import HttpResponse, JsonResponse
from .serializers import ProjectsSerializer, UsersSerializer, CommentsSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

# views.py
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render, get_object_or_404, redirect
from .models import Project, User, Comment
from django.contrib.auth.decorators import login_required

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.views.decorators.csrf import csrf_exempt


class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = "http://localhost:3000/api/auth/callback/github"
    # callback_url = "http://"
    client_class = OAuth2Client

@csrf_exempt
def add_avatar_to_comments(request):
    if request.method == 'POST':
        # Get the avatar URL and username from the request data
        print("in post")
        data = json.loads(request.body)
        avatar_url = data.get('avatar_url')
        username = data.get('username')
        # print("avatar: ", avatar_url)
        # print("username: ", username)

        # Validate input
        if not avatar_url or not username:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        # Update comments with matching username
        try:
            comments = Comment.objects.filter(username=username)
            comments.update(avatar_url=avatar_url)
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    

@csrf_exempt
def like_project(request):
    if request.method == 'POST':
        # Assuming the request body contains JSON data with projectOwner and projectName
        data = json.loads(request.body)
        print(data)
        # print(request.POST)
        url = data.get('repo_url')
        user = data.get('username')

        if not url or not user:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        # Assuming you have a User model with a field to store starred projects
        # print(request.user)
        user_profile = User.objects.get(username=user)
        # print(user_profile)
        # if doesnt work, just pass username into body of post request
        # if not user_profile:
        #     return JsonResponse({'error': 'User not authenticated'}, status=401)

        # Here you can update the user's model to add the starred project
        try:
            # Add logic to update the user's model with the starred project
            # For example:

            if url in user_profile.favourite_projects:
                user_profile.favourite_projects.remove(url)
            else:
                user_profile.favourite_projects.append(url)

            user_profile.save()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def add_comment(request):
    if request.method == 'POST':
        # Assuming the request body contains JSON data with username, repo_url, and text
        data = json.loads(request.body)
        print(data)
        text = data.get('text')
        username = data.get('username')
        repo_url = data.get('repo_url')
        avatar_url = data.get('avatar')

        if not repo_url or not username or not text:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:
            # Create a new comment object
            comment = Comment.objects.create(
                project_url=repo_url,
                username= User.objects.get(username=username),
                text=text,
                avatar_url=avatar_url  # You need to replace this with the actual URL or logic to get the avatar URL
            )
            # Optionally, you can return the ID of the newly created comment
            return JsonResponse({'success': True, 'comment_id': comment.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)



# def get_csrf_token(request):
#     return JsonResponse({"csrfToken": get_token(request)})


# @login_required
# def save_user(request):
#     if request.method == 'POST':
#         data = request.POST  # Assuming user data is sent in the request body
#         # Save user data to the database
#         user = User.objects.create(
#             username=data['username'],
#             favourite_projects=data.get('favourite_projects', []),
#             # Add other fields as needed
#         )
#         user.save()
#         return JsonResponse({'message': 'User saved successfully'})
#     else:
#         return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


def project_detail(request, name, owner):
    project = get_object_or_404(Project, name=name, owner=owner)
    comments = Comment.objects.filter(project_url=project.repo_url)
    comment_form = CommentForm()

    if request.method == "POST" and request.user.is_authenticated:
        # If POST request and user is authenticated, handle like and comment
        user_profile = User.objects.get(username=request.user)
        # Handle like/unlike request
        if "like_button" in request.POST:
            if user_profile.favourite_projects is None:
                user_profile.favourite_projects = []

            value = project.repo_url

            if value in user_profile.favourite_projects:
                user_profile.favourite_projects.remove(value)
            else:
                user_profile.favourite_projects.append(value)

            user_profile.save()

        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.username_id = request.user
            comment.project_url = project.repo_url
            comment.save()
            form = CommentForm()

        # Redirect to avoid duplicate form submissions
        return redirect("project_detail", name=name, owner=owner)

    return render(
        request,
        "backend/project_detail.html",
        {
            "project": project,
            # "user": user_profile,
            "project_comments": comments,
            "comment_form": comment_form,
        },
    )


@login_required #only works in logged in, have to fix
def toggle_favorite(request, name, owner):
    project = get_object_or_404(Project, name=name, owner=owner)
    user_profile = User.objects.get(username=request.user)
    comment_form = CommentForm()
    comments = Comment.objects.filter(project_url=project.repo_url)

    if request.method == 'POST':
        # Handle like/unlike request
        if 'like_button' in request.POST:
            # Check if the JSONB field is null
            if user_profile.favourite_projects is None:
                user_profile.favourite_projects = [] # Initialize with an empty dictionary if it's null

            value = project.repo_url
            # Add data to the JSONB field

            if value in user_profile.favourite_projects:
                user_profile.favourite_projects.remove(value)
            else:
                user_profile.favourite_projects.append(value)

            # Save the object
            user_profile.save()
    
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.username_id = request.user
            comment.project_url = project.repo_url
            comment.save()
            form = CommentForm()


    # return redirect('project_detail', name=name, owner=owner)
    return render(request, 'backend/project_detail.html', {'project': project, 'user': user_profile, 'project_comments': comments, 'comment_form': comment_form})


# class MyModelList(APIView):
#     def get(self, request, format=None):
#         items = MyModel.objects.all()
#         serializer = MyModelSerializer(items, many=True)
#         return Response(serializer.data)


class Home(APIView):
    def get(self, request, format=None):
        # return HttpResponse(
        #     "Welcome to WithImpact RESTFUL API Server.",
        # )
        return render(request, "backend/home_page.html")
    
class FavouriteList(APIView):
    pagination_class = PageNumberPagination

    def get(self, request, username, format=None):


        #Filters

        newcomer_friendly = request.GET.get('newcomer_friendly', None)
        status = request.GET.get('status', None)
        sdg = request.GET.get('sdg', None)
        languages_list = request.GET.get('languages', None)
        search_query = request.GET.get('search', None)

        user = get_object_or_404(User, username__iexact=username.lower())

        favourites = user.favourite_projects
        if not favourites:
            return Response([])
    
        projects = Project.objects.filter(repo_url__in=favourites).order_by('id')

        if newcomer_friendly:
            projects = projects.filter(newcomer_friendly=newcomer_friendly)
        
        if status:
            projects = projects.filter(status=status)

        if sdg:

            goals = [goal.strip() for goal in sdg.split(",")]
            sdg_filters = Q()
            for goal in goals:
                sdg_filters &= Q(sdg_categories__contains=[goal])
            projects = projects.filter(sdg_filters)
        
        if languages_list:

            languages = [language.strip() for language in languages_list.split(",")]
            language_filters = Q()
            for language in languages:
                language_filters &= Q(languages__0__has_key=language)
            projects = projects.filter(language_filters)
        
        if search_query:
            
            search_filters = (
                Q(name__icontains=search_query) |
                Q(owner__icontains=search_query)
            )
            projects = projects.filter(search_filters)

        #Sorting

        sort_param = request.GET.get('sort', None)
        if sort_param == 'popularity-desc':
            projects = projects.order_by('-stars', '-forks', '-watchers')

        if sort_param == 'popularity-asc':
            projects = projects.order_by('stars', 'forks', 'watchers', 'id')

        if sort_param == 'last-updated-desc':
            projects = projects.order_by('-last_push_date')
                                        
        if sort_param == 'last-updated-asc':
            projects = projects.order_by('last_push_date')
        
        if sort_param == 'alphabetical':
            projects = projects.order_by('name', 'owner')

        

        paginator = self.pagination_class()
        results_proj_page = paginator.paginate_queryset(projects, request)
        project_serializer = ProjectsSerializer(results_proj_page, many=True)
        return paginator.get_paginated_response(
            project_serializer.data
        )


class ProjectList(APIView):
    pagination_class = PageNumberPagination

    def get(self, request, format=None):


        #Filters

        newcomer_friendly = request.GET.get('newcomer_friendly', None)
        status = request.GET.get('status', None)
        sdg = request.GET.get('sdg', None)
        languages_list = request.GET.get('languages', None)
        search_query = request.GET.get('search', None)

    
        projects = Project.objects.all().order_by('id')

        if newcomer_friendly:
            projects = projects.filter(newcomer_friendly=newcomer_friendly)
        
        if status:
            projects = projects.filter(status=status)

        if sdg:

            goals = [goal.strip() for goal in sdg.split(",")]
            sdg_filters = Q()
            for goal in goals:
                sdg_filters &= Q(sdg_categories__contains=[goal])
            projects = projects.filter(sdg_filters)
        
        if languages_list:

            languages = [language.strip() for language in languages_list.split(",")]
            language_filters = Q()
            for language in languages:
                language_filters &= Q(languages__0__has_key=language)
            projects = projects.filter(language_filters)
        
        if search_query:
            
            search_filters = (
                Q(name__icontains=search_query) |
                Q(owner__icontains=search_query)
            )
            projects = projects.filter(search_filters)

        #Sorting

        sort_param = request.GET.get('sort', None)
        if sort_param == 'popularity-desc':
            projects = projects.order_by('-stars', '-forks', '-watchers')

        if sort_param == 'popularity-asc':
            projects = projects.order_by('stars', 'forks', 'watchers', 'id')

        if sort_param == 'last-updated-desc':
            projects = projects.order_by('-last_push_date')
                                        
        if sort_param == 'last-updated-asc':
            projects = projects.order_by('last_push_date')
        
        if sort_param == 'alphabetical':
            projects = projects.order_by('name', 'owner')

        

        paginator = self.pagination_class()
        results_proj_page = paginator.paginate_queryset(projects, request)
        project_serializer = ProjectsSerializer(results_proj_page, many=True)
        return paginator.get_paginated_response(
            project_serializer.data
        )
    

class UserList(APIView):
    def get(self, request, format=None):
        
        users = User.objects.all()
        user_serializer = UsersSerializer(users, many=True)

        return Response(user_serializer.data, status=status.HTTP_200_OK)
    
# class Comments(APIView):
#     def get(self, request, name, owner, format=None):
#         repo_url = "https://github.com/{owner}/{name}"
#         comments_obj = Comment.objects.filter(project_url=repo_url)
#         comment_serializer = CommentsSerializer(comments_obj)

#         return Response(comment_serializer.data, status=status.HTTP_200_OK)
    
class ProjectInfo(APIView):
    def get(self, request, name, owner, format=None):
        project_obj = get_object_or_404(Project, name=name, owner=owner)
        proj_serializer = ProjectsSerializer(project_obj)
        # repo_url = "https://github.com/{owner}/{name}"
        comments_obj = Comment.objects.filter(project_url=project_obj.repo_url)
        comment_serializer = CommentsSerializer(comments_obj, many=True)

        data = {
            'project': proj_serializer.data,
            'comments': comment_serializer.data
        }

        return Response(data, status=status.HTTP_200_OK)
    
class Projects(APIView):
    def get(self, request, name, owner, format=None):
        project_obj = get_object_or_404(Project, name=name, owner=owner)
        context = {"project": project_obj}
        return render(request, "backend/project_detail.html", context)


class UserInfo(APIView):
    def get(self, request, username, format=None):
        user_obj = get_object_or_404(User, username=username)
        project_obj = Project.objects.filter(repo_url__in=user_obj.favourite_projects)
        proj_serializer = ProjectsSerializer(project_obj, many=True)
        user_serializer = UsersSerializer(user_obj)

        data = {
            'user': user_serializer.data,
            'project': proj_serializer.data
        }

        return Response(data, status=status.HTTP_200_OK)
    

