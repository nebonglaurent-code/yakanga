from django.db import models


class Abonne(models.Model):
    email = models.EmailField(unique=True)
    date_inscription = models.DateTimeField(auto_now_add=True)
    actif = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Abonné newsletter'

    def __str__(self):
        return self.email