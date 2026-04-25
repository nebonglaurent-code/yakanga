from django.urls import path
from . import views

urlpatterns = [
    path('', views.ArticleListView.as_view(), name='article-list'),
    path('une/', views.home_data, name='home-data'),
    path('categories/', views.CategorieListView.as_view(), name='categorie-list'),
    path('<slug:slug>/', views.ArticleDetailView.as_view(), name='article-detail'),
]