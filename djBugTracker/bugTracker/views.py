from django.shortcuts import render
from django.http import Http404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import IssueSerializer, UserSerializer, ProjectSerializer, AddProjectSerializer, AddIssueSerializer
from .models import Issue, Project

from django.contrib.auth import get_user_model

user_model = get_user_model()
# Create your views here.

class DashbordView(APIView):
    permission_classes = [IsAuthenticated, ]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        project_serializer = ProjectSerializer(Project.objects.filter(creator=request.user).order_by("-created_at"), many=True)

        issue_serializer = IssueSerializer(Issue.objects.filter(creator=request.user), many=True)

        context = {'projects': project_serializer.data, 'issues': issue_serializer.data, }

        return Response(context)

class ProjectCreateView(generics.CreateAPIView):
    serializer_class = AddProjectSerializer
    parser_classes = (MultiPartParser, FormParser)

class IssueCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = AddIssueSerializer

class ProjectView(APIView):

    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

class UserFilter(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'slug'

    def get_queryset(self):
        slug = self.kwargs['slug']
        return user_model.objects.filter(username__contains=slug).exclude(username=self.request.user.username)


class UsersView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        serializer = UserSerializer(user_model.objects.exclude(username=request.user.username), many=True)

        return Response(serializer.data)
