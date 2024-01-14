from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .models import User, Project
# from .serializers import MyModelSerializer
from django.http import HttpResponse


# class MyModelList(APIView):
#     def get(self, request, format=None):
#         items = MyModel.objects.all()
#         serializer = MyModelSerializer(items, many=True)
#         return Response(serializer.data)


class Home(APIView):
    def get(self, request, format=None):
        return HttpResponse(
            "Welcome to WithImpact RESTFUL API Server.",
        )


class Projects(APIView):
    def get(self, request, format=None):
        # first_project = Project.objects.first()
        # print("this is the project: ----------", first_project.tags)
        # if not first_project:
        #     return HttpResponse(
        #         "oof.",
        #     )

        # return render(request, "backend/project_detail.html", {"project": first_project})
        project_obj = Project.objects.all()
        context = {
            "projects": project_obj
        }

        return render(request, "backend/project_detail.html", context)
    
class Users(APIView):
    def get(self, request, pk,format=None):
        user_obj = User.objects.get(pk=pk)
        context = {
            "users": user_obj
        }
        return render(request, "backend/user_info.html", context)

