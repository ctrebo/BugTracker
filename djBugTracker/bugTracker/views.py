from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import IssueSerializer, UserSerializer, ProjectSerializer
from .models import Issue, Project

from django.contrib.auth import get_user_model

user_model = get_user_model()
# Create your views here.

class DashbordView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        project_serializer = ProjectSerializer(Project.objects.filter(creator=request.user), many=True)
        user_serializer = UserSerializer(user_model.objects.all(), many=True)

        context = {'projects': project_serializer.data, 'users': user_serializer.data, }

        return Response(context)
