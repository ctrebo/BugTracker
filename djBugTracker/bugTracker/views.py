from django.shortcuts import render
from django.http import Http404
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes

from .serializers import IssueSerializer, UserSerializer, ProjectSerializer, AddProjectSerializer, AddIssueSerializer
from .models import Issue, Project

from django.contrib.auth import get_user_model

user_model = get_user_model()
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProjectsByUser(request):
    project_query = Project.objects.filter(Q(creator=request.user) | Q(team_members__id=request.user.id)).distinct()

    serializer = ProjectSerializer(project_query, many=True)
    
    print(f"{project_query=}")
    
    # return Response(serializer.data)
    return Response(serializer.data)



class DashbordView(APIView):
    permission_classes = [IsAuthenticated, ]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        project_serializer = ProjectSerializer(Project.objects.filter(creator=request.user).order_by("-created_at"), many=True)

        # Issues created or assigned by user
        issues_query = Issue.objects.filter(Q(assigned_to=request.user) | Q(creator=request.user))

        issue_serializer_created_by_user = IssueSerializer(issues_query.filter(creator=request.user), many=True)
        issue_serializer_assigned_to_user = IssueSerializer(issues_query.filter(assigned_to=request.user), many=True)

        context = {
            'projects': project_serializer.data,
            'issues_created_by_user': issue_serializer_created_by_user.data,
            'issues_assigned_to_user': issue_serializer_assigned_to_user.data
        }

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
