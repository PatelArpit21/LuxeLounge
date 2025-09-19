# backend/ml/management/commands/generate_booking_data.py

import pandas as pd
import numpy as np
from django.core.management.base import BaseCommand
from pathlib import Path

class Command(BaseCommand):
    help = 'Generates a synthetic booking data CSV file for ML model training.'

    def handle(self, *args, **kwargs):
        self.stdout.write("Generating synthetic booking data...")

        # Define the date range for the dataset (3 years)
        dates = pd.date_range(start='2022-01-01', end='2024-12-31', freq='D')
        n_days = len(dates)

        # 1. Base trend: Simulate steady growth over time
        base_bookings = 20
        trend = np.linspace(0, 15, n_days)

        # 2. Weekly seasonality: More bookings on weekends
        day_of_week = dates.dayofweek
        # Peaks on Friday (4) and Saturday (5)
        weekly_seasonality = 5 * np.sin(2 * np.pi * (day_of_week - 2) / 7) + 5

        # 3. Yearly seasonality: More bookings in summer and during holidays
        day_of_year = dates.dayofyear
        # Peaks in mid-year (summer) and end-of-year (holidays)
        yearly_seasonality = 10 * np.sin(2 * np.pi * (day_of_year - 80) / 365.25) + \
                             5 * np.sin(2 * np.pi * (day_of_year - 340) / 365.25) + 10

        # 4. Noise: Add random fluctuations to make it more realistic
        noise = np.random.normal(0, 3, n_days)

        # Combine all components
        # Use np.maximum to ensure booking counts are not negative
        booking_counts = np.maximum(
            0,
            base_bookings + trend + weekly_seasonality + yearly_seasonality + noise
        ).astype(int)

        # Create a pandas DataFrame
        df = pd.DataFrame({
            'date': dates,
            'bookings': booking_counts
        })

        # Define the output path
        # This will save the file in backend/ml/data/booking_counts.csv
        output_dir = Path(__file__).resolve().parent.parent.parent.parent / 'data'
        output_dir.mkdir(parents=True, exist_ok=True)
        output_path = output_dir / 'booking_counts.csv'

        # Save the DataFrame to a CSV file
        df.to_csv(output_path, index=False)

        self.stdout.write(self.style.SUCCESS(f"Successfully generated synthetic data at {output_path}"))
