# backend/hotel/management/commands/seed_data.py

import random
from django.core.management.base import BaseCommand
from hotel.models import Room

class Command(BaseCommand):
    help = 'Seeds the database with initial room data'

    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old room data...")
        # Clear existing room data to prevent duplicates
        Room.objects.all().delete()

        self.stdout.write("Creating new room data...")

        rooms_to_create = [
            {
                'room_type': 'Deluxe Queen Room',
                'rate_per_night': 275.00,
                'description': 'A spacious room with a luxurious queen-sized bed, city views, and a modern en-suite bathroom. Perfect for solo travelers or couples.',
                'quantity': 10,
            },
            {
                'room_type': 'Executive King Suite',
                'rate_per_night': 450.00,
                'description': 'Experience ultimate comfort in our Executive King Suite, featuring a separate living area, a king-sized bed, and exclusive access to the club lounge.',
                'quantity': 5,
            },
            {
                'room_type': 'Standard Twin Room',
                'rate_per_night': 220.00,
                'description': 'Ideal for friends or colleagues, this room offers two comfortable single beds, a work desk, and all essential amenities for a pleasant stay.',
                'quantity': 15,
            },
            {
                'room_type': 'Ocean View Penthouse',
                'rate_per_night': 950.00,
                'description': 'The pinnacle of luxury. Our Penthouse boasts panoramic ocean views, a private terrace, a fully-equipped kitchenette, and personalized butler service.',
                'quantity': 2,
            },
            {
                'room_type': 'Family Garden Bungalow',
                'rate_per_night': 550.00,
                'description': 'A private bungalow with direct garden access, two bedrooms, and a spacious patio. Perfect for families seeking a tranquil retreat.',
                'quantity': 4,
            },
             {
                'room_type': 'Cityscape Loft',
                'rate_per_night': 380.00,
                'description': 'A stylish, bi-level loft with floor-to-ceiling windows offering stunning cityscape views. Features a modern design and a comfortable living space.',
                'quantity': 6,
            }
        ]

        for room_data in rooms_to_create:
            Room.objects.create(**room_data)

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database with room data.'))

