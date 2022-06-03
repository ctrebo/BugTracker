from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm


from .models import CustomUser

class CustomUserCreationFormAdmin(UserCreationForm):

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ("username", "bio", "job", "prof_pic", "email")


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ("username", "last_name", "first_name", "prof_pic", "job", "email")


