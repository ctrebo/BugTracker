from rest_framework import serializers
from rest_framework.serializers import DateTimeField
from .models import Project, CustomUser, Issue

from django.contrib.auth import get_user_model

user_model = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    last_login = DateTimeField(format=None, input_formats=None)

    class Meta:
        model = user_model
        fields = ("last_login", "username", "first_name", "last_name", "email", "id", "job", "prof_pic", "bio", "password")
        extra_kwargs = {'password': {'write_only': True}}

class ProjectSerializer(serializers.ModelSerializer):
    creator = UserSerializer(required=True)
    team_members = UserSerializer(many=True, required=True)
    created_at = DateTimeField(format=None, input_formats=None)

    class Meta:
        model = Project
        fields = ("name", "field", "created_at", "creator", "team_members", "picture")

class IssueSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(required=True)
    creator = UserSerializer(required=True)
    assigned_to = UserSerializer(required=True)

    class Meta:
        model = Issue
        fields = ("name", "project", "creator", "description", "status", "priority", "issue_type", )




