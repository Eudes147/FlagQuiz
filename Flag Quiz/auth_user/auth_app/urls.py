from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path("dashboard/", Dashboard.as_view(), name="dashboard"),
    path("signin/",SignIn.as_view(),name="signin"),
    path("login/<str:username>/",Login.as_view(),name="signup"),
    path("logout/<str:username>/",LogoutView.as_view(),name="logout"),
    path("changParams/<str:username>/",ChangePoints.as_view(),name="profile"),
]
