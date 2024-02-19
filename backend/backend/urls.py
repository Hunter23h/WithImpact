"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from . import views
from .views import toggle_favorite

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.Home.as_view()),
    # path("mymodel/", views.MyModelList.as_view()),
    path("getprojects/", views.ProjectList.as_view(), name="project_list"),
    path("getusers/", views.UserList.as_view(), name="user_list"),
    path(
        "projects/<str:owner>/<str:name>", views.project_detail, name="project_detail"
    ),
    path("users/<str:pk>/", views.Users.as_view(), name="user_detail"),
    path("accounts/", include("allauth.urls")),
    path("accounts/", include("allauth.socialaccount.urls")),
    path("csrf/", views.get_csrf_token, name="get_csrf_token"),
    path("api/user-info/", views.user_info, name="user_info"),
    path("github/", views.GithubLogin.as_view(), name="github_login"),
]
