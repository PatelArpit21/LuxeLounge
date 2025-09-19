# backend/ml/management/commands/train_prophet_model.py

import pandas as pd
from prophet import Prophet
from prophet.serialize import model_to_json
from django.core.management.base import BaseCommand
from pathlib import Path

class Command(BaseCommand):
    help = 'Trains the Prophet forecasting model and saves it to a file.'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting model training...")

        # Define paths
        base_dir = Path(__file__).resolve().parent.parent.parent.parent
        # Corrected data_path to look in backend/data/
        data_path = base_dir / 'data' / 'booking_counts.csv'
        models_dir = base_dir / 'ml' / 'models'
        model_path = models_dir / 'prophet_model.json'

        # Ensure directories exist
        models_dir.mkdir(parents=True, exist_ok=True)

        # 1. Load Data
        try:
            df = pd.read_csv(data_path)
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"Data file not found at {data_path}"))
            self.stdout.write(self.style.WARNING("Please run 'python manage.py generate_booking_data' first."))
            return

        # 2. Preprocess Data for Prophet
        df = df.rename(columns={'date': 'ds', 'bookings': 'y'})
        df['ds'] = pd.to_datetime(df['ds'])

        # 3. Train Model
        self.stdout.write("Training Prophet model...")
        model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False,
            changepoint_prior_scale=0.05,
            seasonality_prior_scale=10.0
        )
        model.fit(df)
        self.stdout.write("Model training complete.")

        # 4. Serialize and Store Model
        self.stdout.write(f"Saving model to {model_path}...")
        with open(model_path, 'w') as f:
            f.write(model_to_json(model))

        self.stdout.write(self.style.SUCCESS('Successfully trained and saved the forecasting model.'))
