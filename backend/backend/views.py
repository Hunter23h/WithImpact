from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, get_object_or_404
from .models import User, Project
from .forms import CommentForm

# from .serializers import MyModelSerializer
from django.http import HttpResponse, JsonResponse
from .serializers import ProjectsSerializer, UsersSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

# views.py
from django.shortcuts import render, get_object_or_404, redirect
from .models import Project, User, Comment
from django.contrib.auth.decorators import login_required

@login_required
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
    
        # project_obj = Project.objects.all()
        # context = {
        #     "projects": project_obj
        # }
        # form = ProjectFilterForm(request.GET)

        # if form.is_valid():
        #     newcomer_friendly = form.cleaned_data.get('newcomer_friendly')
        #     if newcomer_friendly:
        #         projects = projects.filter(newcomer_friendly=newcomer_friendly == 'True')

        #     status = form.cleaned_data.get('status')
        #     if status:
        #         projects = projects.filter(status=status)

        # context = {
        #     'projects': projects,
        #     # 'form': form,
        # }

        # return render(request, "backend/project_list.html", context)
        # return Response(project_serializer.data, status=status.HTTP_200_OK)
    
class UserList(APIView):
    def get(self, reqest, format=None):
        
        users = User.objects.all()
        user_serializer = UsersSerializer(users, many=True)

        return Response(user_serializer.data, status=status.HTTP_200_OK)
    


    
class Projects(APIView):
    def get(self, request, name, owner, format=None):
        project_obj = get_object_or_404(Project, name=name, owner=owner)
        context = {"project": project_obj}
        return render(request, "backend/project_detail.html", context)


class Users(APIView):
    def get(self, request, pk, format=None):
        user_obj = User.objects.get(pk=pk)
        project_obj = Project.objects.filter(repo_url__in=user_obj.favourite_projects)
        context = {"users": user_obj, "project": project_obj}
        return render(request, "backend/user_info.html", context)
