from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("tracker/", include("bugTracker.urls")),
    path("api/", include("bugTracker.api.urls")),
    #path('', RedirectView.as_view(url="tracker/", permanent=True)),
]  
urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT) 

if settings.DEBUG:
    urlpatterns +=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
