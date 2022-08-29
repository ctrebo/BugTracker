from rest_framework import generics
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth import get_user_model

user_model = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = user_model
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(["get"])
def get_routes(request):
    routes = [
        'api/token',
        'api/token/refresh',
    ]
    

    return Response(routes)
