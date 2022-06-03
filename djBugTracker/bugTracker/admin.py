from django.contrib import admin
from .models import CustomUser, Project, Issue

from .forms import CustomUserCreationFormAdmin, CustomUserChangeForm

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationFormAdmin
    form = CustomUserChangeForm
    list_display = ("username", "job", "email", "id")
    list_filter = ("date_joined", "username", "job")

    fieldsets = (
        (None, {
            'fields': ('username', "password")}),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email', 'last_login')}),
        ('permissions',{
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions',)}),

        ('custom user', {'fields': ('bio', 'prof_pic', 'job')}),
    )
   
   #variables that will be displayed on the creaet user side
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1','password2', 'bio', 'is_staff', 'is_active', 'job', 'prof_pic')}
        ),
    )

#class IssueInline(admin.TabularInline):
#    model = Issue

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "field" ,"creator", "id")
    list_filter = ("field", )

#    inlines = [IssueInline]


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ("name", "project", "id")




