from django.contrib import admin
from .models import Article, Categorie, Tag


@admin.register(Categorie)
class CategorieAdmin(admin.ModelAdmin):
    list_display = ['nom', 'slug', 'ordre']
    prepopulated_fields = {'slug': ('nom',)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['nom', 'slug']
    prepopulated_fields = {'slug': ('nom',)}


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['titre', 'categorie', 'auteur', 'statut', 'est_premium', 'est_a_la_une', 'date_publication']
    list_filter = ['statut', 'categorie', 'est_premium', 'est_a_la_une']
    search_fields = ['titre', 'chapeau', 'contenu']
    prepopulated_fields = {'slug': ('titre',)}
    list_editable = ['statut', 'est_a_la_une', 'est_premium']
    date_hierarchy = 'date_publication'
    filter_horizontal = ['tags']