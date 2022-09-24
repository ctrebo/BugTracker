from django.urls import path, re_path, include

from . import views

urlpatterns = [
    path("dashboard/", views.DashbordView.as_view(), name="dashbord"),
    path("project/<int:pk>/", views.ProjectView.as_view(), name="project"),
    path("create-project/", views.ProjectCreateView.as_view(), name="create-project"),
    path("create-issue/", views.IssueCreateView.as_view(), name="create-issue"),
    re_path(r'^userfilter/(?P<slug>[\w|\W]+)/', views.UserFilter.as_view()),
    path("users/", views.UsersView.as_view(), name="users"),
    path("get-projects-by-user/", views.getProjectsByUser, name="get-projects-by-user"),
]




