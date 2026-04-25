from django.urls import path
from . import views

urlpatterns = [
    path('inscription/', views.inscription_newsletter, name='newsletter-inscription'),
]