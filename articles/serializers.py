from rest_framework import serializers
from .models import Article, Categorie, Tag


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ['id', 'nom', 'slug']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nom', 'slug']


class ArticleListSerializer(serializers.ModelSerializer):
    """Serializer léger pour les listes et cartes"""
    categorie = CategorieSerializer(read_only=True)
    auteur_nom = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id', 'titre', 'slug', 'chapeau', 'image_url',
            'categorie', 'auteur_nom', 'est_premium',
            'est_a_la_une', 'vues', 'date_publication'
        ]

    def get_auteur_nom(self, obj):
        if obj.auteur:
            return f"{obj.auteur.first_name} {obj.auteur.last_name}".strip() or obj.auteur.username
        return "Rédaction EcoMatin"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class ArticleDetailSerializer(serializers.ModelSerializer):
    """Serializer complet pour la page article"""
    categorie = CategorieSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    auteur_nom = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            'id', 'titre', 'slug', 'chapeau', 'contenu',
            'image_url', 'categorie', 'tags', 'auteur_nom',
            'est_premium', 'vues', 'date_publication'
        ]

    def get_auteur_nom(self, obj):
        if obj.auteur:
            return f"{obj.auteur.first_name} {obj.auteur.last_name}".strip() or obj.auteur.username
        return "Rédaction EcoMatin"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None