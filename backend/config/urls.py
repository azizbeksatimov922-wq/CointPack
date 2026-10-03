from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        "status": "Ajoyib!",
        "message": "CointPack REST API muvaffaqiyatli ishlamoqda!",
        "endpoints": "/api/"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', home_view),  # Bosh sahifa (127.0.0.1:8000/)
]