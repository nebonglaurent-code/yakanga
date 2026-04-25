from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Article, Categorie, Tag
from .serializers import ArticleListSerializer, ArticleDetailSerializer, CategorieSerializer, TagSerializer


class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        queryset = Article.objects.filter(statut='publie')
        categorie_slug = self.request.query_params.get('categorie')
        tag_slug = self.request.query_params.get('tag')
        premium = self.request.query_params.get('premium')
        a_la_une = self.request.query_params.get('une')

        if categorie_slug:
            queryset = queryset.filter(categorie__slug=categorie_slug)
        if tag_slug:
            queryset = queryset.filter(tags__slug=tag_slug)
        if premium:
            queryset = queryset.filter(est_premium=True)
        if a_la_une:
            queryset = queryset.filter(est_a_la_une=True)

        return queryset

    def get_serializer_context(self):
        return {'request': self.request}


class ArticleDetailView(generics.RetrieveAPIView):
    serializer_class = ArticleDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Article.objects.filter(statut='publie')

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Incrémente le compteur de vues
        instance.vues += 1
        instance.save(update_fields=['vues'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def get_serializer_context(self):
        return {'request': self.request}


class CategorieListView(generics.ListAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer


@api_view(['GET'])
def home_data(request):
    """Endpoint unique pour la page d'accueil — réduit les requêtes"""
    a_la_une = Article.objects.filter(statut='publie', est_a_la_une=True)[:5]
    derniers = Article.objects.filter(statut='publie')[:8]
    categories = Categorie.objects.all()

    return Response({
        'a_la_une': ArticleListSerializer(a_la_une, many=True, context={'request': request}).data,
        'derniers_articles': ArticleListSerializer(derniers, many=True, context={'request': request}).data,
        'categories': CategorieSerializer(categories, many=True).data,
    })