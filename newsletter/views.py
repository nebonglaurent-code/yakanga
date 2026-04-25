from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Abonne


@api_view(['POST'])
def inscription_newsletter(request):
    email = request.data.get('email', '').strip()
    if not email:
        return Response({'error': 'Email requis.'}, status=status.HTTP_400_BAD_REQUEST)

    abonne, created = Abonne.objects.get_or_create(email=email)
    if created:
        return Response({'message': 'Inscription réussie !'}, status=status.HTTP_201_CREATED)
    return Response({'message': 'Vous êtes déjà abonné.'}, status=status.HTTP_200_OK)