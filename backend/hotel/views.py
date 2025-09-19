# backend/hotel/views.py
from rest_framework import viewsets, permissions
from .models import Room
from .serializers import RoomSerializer

class RoomViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Room.objects.all().order_by('rate_per_night')
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny] # Anyone can view rooms
    