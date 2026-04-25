from django.contrib import admin
from .models import Abonne


@admin.register(Abonne)
class AbonneAdmin(admin.ModelAdmin):
    list_display = ['email', 'date_inscription', 'actif']
    list_filter = ['actif']