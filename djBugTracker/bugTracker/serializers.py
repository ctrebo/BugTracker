from rest_framework import serializers
from rest_framework.serializers import DateTimeField, ImageField
from .models import Project, CustomUser, Issue
from django.contrib.auth import get_user_model

user_model = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    last_login = DateTimeField(format=None, input_formats=None, read_only=True)
    prof_pic = ImageField(required=True)  

    class Meta:
        model = user_model
        fields = ("last_login", "username", "first_name", "last_name", "email", "id", "job", "prof_pic", "bio", "password")
        extra_kwargs = {'password': {'write_only': True}, 'id': {'read_only':True}}

class ProjectSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    team_members = UserSerializer(many=True, read_only=True)
    created_at = DateTimeField(format=None, input_formats=None, read_only=True)
    picture = ImageField(required=False)

    class Meta:
        model = Project
        fields = ("name", "field", "created_at", "creator", "team_members", "picture", "id")

class AddProjectSerializer(serializers.ModelSerializer):
    creator = serializers.CharField()
    team_members = serializers.CharField(allow_blank=True)
    created_at = DateTimeField(format=None, input_formats=None, read_only=True)
    picture = ImageField(required=False)

    class Meta:
        model = Project
        fields = ("name", "field", "created_at", "creator", "team_members", "picture", "id")

    def create(self, validated_data):
        validated_user = validated_data.pop("creator", None)
        user_ = user_model.objects.get(username=validated_user)

        ids_str = validated_data.pop("team_members", [])
        arr_ids_str = ids_str.split(" ")

        picture = validated_data.pop("picture", None)
        
        if(picture):
            project = Project.objects.create(
                **validated_data,
                creator = user_,
                picture = picture
            )
        else:
            project = Project.objects.create(
                **validated_data,
                creator = user_,
            )


        if len(ids_str) > 0:
            arr_ids_int = list(map(int, arr_ids_str))
            arr_ids_int.append(user_.id)
            project.team_members.add(*arr_ids_int)

        return project

class IssueSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(required=True)
    creator = UserSerializer(required=True)
    due = DateTimeField(format=None, input_formats=None)
    created_at = DateTimeField(format=None, input_formats=None)
    assigned_to = UserSerializer(required=True)

    class Meta:
        model = Issue
        fields = ("name", "project", "creator", "description", "status", "priority", "assigned_to", "issue_type", "id", "due", "created_at")

class AddIssueSerializer(serializers.ModelSerializer):
    project = serializers.CharField(required=True)
    due = DateTimeField(format=None, input_formats=None)
    assigned_to = serializers.CharField(required=True)

    class Meta:
        model = Issue
        fields = ("name", "project", "description", "status", "priority", "assigned_to", "issue_type", "id", "due")

    def create(self, validated_data):
        project_query = validated_data.pop("project")
        assigned_to_query = validated_data.pop("assigned_to")

        creator = self.context['request'].user
        project = Project.objects.get(field=project_query)
        assigned_to = user_model.objects.get(username=assigned_to_query)

        return Issue.objects.create(**validated_data, creator=creator, project=project, assigned_to=assigned_to)




