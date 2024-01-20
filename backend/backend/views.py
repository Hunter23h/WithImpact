from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, get_object_or_404
from .models import User, Project
from .forms import ProjectFilterForm

# from .serializers import MyModelSerializer
from django.http import HttpResponse, JsonResponse
from .serializers import ProjectsSerializer, UsersSerializer
from rest_framework.pagination import PageNumberPagination


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
        # project_obj = Project.objects.all()
        # context = {
        #     "projects": project_obj
        # }
        # form = ProjectFilterForm(request.GET)
        projects = Project.objects.all()

        paginator = self.pagination_class()
        results_proj_page = paginator.paginate_queryset(projects, request)
        project_serializer = ProjectsSerializer(results_proj_page, many=True)
        return paginator.get_paginated_response(
            project_serializer.data
        )

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
        return Response(project_serializer.data, status=status.HTTP_200_OK)
    
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
