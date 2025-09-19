# backend/hotel/serializers.py
from rest_framework import serializers
# backend/hotel/serializers.py

from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'room_type', 'rate_per_night', 'description', 'quantity']
