from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User


class Categorie(models.Model):
    nom = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    ordre = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordre', 'nom']
        verbose_name = 'Catégorie'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nom)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nom


class Tag(models.Model):
    nom = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nom)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nom


class Article(models.Model):
    STATUT_CHOICES = [
        ('brouillon', 'Brouillon'),
        ('publie', 'Publié'),
    ]

    titre = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    chapeau = models.TextField(help_text="Résumé affiché sur les cartes")
    contenu = models.TextField()
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    categorie = models.ForeignKey(Categorie, on_delete=models.SET_NULL, null=True, related_name='articles')
    tags = models.ManyToManyField(Tag, blank=True)
    auteur = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    est_premium = models.BooleanField(default=False)
    est_a_la_une = models.BooleanField(default=False)
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='brouillon')
    vues = models.PositiveIntegerField(default=0)
    date_publication = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_publication']
        verbose_name = 'Article'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titre