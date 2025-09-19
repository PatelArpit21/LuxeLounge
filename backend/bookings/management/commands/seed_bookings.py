# backend/bookings/management/commands/seed_bookings.py

import random
import numpy as np
import pandas as pd
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from accounts.models import FrontendUser
from hotel.models import Room
from bookings.models import Booking

class Command(BaseCommand):
    help = 'Seeds the database with realistic synthetic booking data for ML training.'

    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old booking and user data...")
        Booking.objects.all().delete()
        FrontendUser.objects.filter(is_superuser=False, is_staff=False).delete()

        if not Room.objects.exists():
            self.stdout.write(self.style.ERROR("No rooms found. Please run 'seed_data' first."))
            return

        self.stdout.write("Creating new synthetic users...")
        users = []
        for i in range(20):
            user, _ = FrontendUser.objects.get_or_create(
                email=f'guest{i+1}@example.com',
                defaults={'first_name': f'Guest{i+1}'}
            )
            if not user.password:
                user.set_password('password123')
                user.save()
            users.append(user)

        self.stdout.write("Generating realistic seasonal booking data...")
        rooms = list(Room.objects.all())
        
        # Generate a clean date range (2 years is sufficient and faster)
        start_date = timezone.now().date() - timedelta(days=365 * 2)
        dates = pd.date_range(start=start_date, periods=365 * 2, freq='D')

        # Create a more realistic seasonal pattern
        day_of_year = dates.dayofyear
        # Milder summer peak
        yearly_seasonality = 8 * np.sin(2 * np.pi * (day_of_year - 150) / 365.25) + 4
        
        day_of_week = dates.dayofweek
        # Milder weekend peak
        weekly_seasonality = 5 * (np.isin(day_of_week, [4, 5])) # Friday & Saturday
        
        # Lower base and trend for more realistic numbers
        base_bookings = 5
        trend = np.linspace(0, 5, len(dates))
        noise = np.random.uniform(0, 1, len(dates)) # Reduced noise

        # Combine to get daily booking counts
        daily_counts = (base_bookings + yearly_seasonality + weekly_seasonality + trend + noise).astype(int)

        # Create booking objects based on the generated counts
        for i, date in enumerate(dates):
            num_bookings_for_day = daily_counts[i]
            if num_bookings_for_day < 0:
                num_bookings_for_day = 0
            
            for _ in range(num_bookings_for_day):
                user = random.choice(users)
                room = random.choice(rooms)
                duration = random.randint(1, 5)
                check_out_date = date.date() + timedelta(days=duration)
                
                status = Booking.BookingStatus.COMPLETED

                Booking.objects.create(
                    user=user,
                    room=room,
                    check_in=date.date(),
                    check_out=check_out_date,
                    status=status,
                    total_amount=duration * room.rate_per_night,
                    created_at=date
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database with realistic bookings.'))
