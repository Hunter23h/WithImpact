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
    path("getfavourites/<str:username>", views.FavouriteList.as_view(), name="favourite_list"),
    path('addavatar/', views.add_avatar_to_comments, name='add_avatar_to_comments'),
    path('likeproject/', views.like_project, name='like_project'),
    path('addcomment/', views.add_comment, name='add_comment'),
    # path(
    #     "projects/<str:owner>/<str:name>", views.project_detail, name="project_detail"
    # ),
    path(
        "projects/<str:owner>/<str:name>", views.ProjectInfo.as_view(), name="project_info"
    ),
    path("users/<str:username>/", views.UserInfo.as_view(), name="user_detail"),
    path("accounts/", include("allauth.urls")),
    path("accounts/", include("allauth.socialaccount.urls")),
    # path("csrf/", views.get_csrf_token, name="get_csrf_token"),
    # path("api/save-user/", views.save_user, name="save_user"),
    path("github/", views.GithubLogin.as_view(), name="github_login"),
    path("submiturl/", views.submit_url, name='submit_url'),
]
