import os

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.conf import settings
from django.urls import reverse


# Create your models here.
class CustomUser(AbstractUser):
    """
    Model representing a extension of the default User Model
    """
    date_joined = models.DateTimeField(auto_now_add=True)     
    job         = models.CharField(max_length=15) 
    prof_pic    = models.ImageField(default="default_pp.jpg", upload_to="pp_pics/")
    bio         =  models.TextField(max_length=100, blank=True, null=True)

    def get_absolute_url(self):
        return reverse("user_detail", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.username}"


class Project(models.Model):
    """
    Model representing a Project
    """
    name         = models.CharField(max_length=20)
    # Like Marketing, Website, Support
    field        = models.CharField(max_length=10)
    created_at   = models.DateTimeField(auto_now_add=True)
    # The one who created the Project
    creator      = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, blank=False, related_name="projects_as_creator")
    # Other people who also have access to this project 
    team_members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="projects", blank=True)
    picture      = models.ImageField(upload_to="image_post", default="default_project_picture.png")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name}"

    def get_absolute_ur(self):
        return reverse("project-detail", kwargs={"pk": self.pk})

class Issue(models.Model):
    """
    Model to represent an Issue or a Bug
    """
    name        = models.CharField(max_length=50, unique=True) 
    project     = models.ForeignKey("Project", on_delete=models.CASCADE)
    # Use 'user.my_issues' to get all issues a user has created
    creator     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, blank=False, related_name="my_issues")
    description = models.TextField(max_length=500, null=True, blank=True)
    
    """
    - Use 'blank=True' and 'null=True' because issue shouldnt be deleted if developpers doesnt exist anymore
    - Furthermore the tasks a user can be queried by usung 'user.tasks'
    """
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True, on_delete=models.SET_NULL, related_name="tasks")

    ISSUE_STATUS = (
        ("o", "Open"),
        ("p", "In Progress"),
        ("r", "Resolved")
    )

    PRIORITY_CHOICES = (
        ("h", "High"),
        ("m", "Middle"),
        ("l", "Low")
    )

    TYPE_COICES = (
        ("i", "Improve"),
        ("t", "Task"),
        ("b", "Bug"),
        ("r", "Request")
    )

    status   = models.CharField(max_length=1, choices=ISSUE_STATUS, blank=True, default="o")
    priority = models.CharField(max_length=1, choices=PRIORITY_CHOICES, blank=True)
    #due_date = models.DateTimeField()
    issue_type = models.CharField(max_length=1, choices=TYPE_COICES, blank=True)

    class Meta:
        ordering = ["priority"]

    def __str__(self):
        return f"{self.name}"

    def get_absolute_url(self):
        return reverse("issue-detail", kwargs={"pk": self.pk})
