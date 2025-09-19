# backend/hotel/models.py

from django.db import models

class Room(models.Model):
    room_type = models.CharField(max_length=120, unique=True)
    rate_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    quantity = models.PositiveSmallIntegerField(default=1, help_text="Number of rooms of this type available.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.room_type} - ${self.rate_per_night}/night"
