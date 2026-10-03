from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, SavingsViewSet, login, register

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'savings', SavingsViewSet, basename='savings')

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('', include(router.urls)),
]