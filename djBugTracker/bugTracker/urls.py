from django.urls import path, re_path, include
from django.conf.urls import url

from . import views

urlpatterns = [
    path("projects/", views.DashbordView.as_view(), name="dashbord"),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls'))
]


