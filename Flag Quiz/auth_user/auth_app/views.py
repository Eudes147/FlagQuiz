from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import logout
# Create your views here.

class SignIn(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Login(APIView):
    def get(self, request, username):
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Déconnexion réussie"}, status=status.HTTP_200_OK)
    
class ChangePoints(generics.UpdateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    lookup_field = 'username'

class Dashboard(generics.ListAPIView):
    queryset = User.objects.all().order_by('-points')
    serializer_class = UserSerializer