# backend/ml/management/commands/train_regression_model.py

import pandas as pd
import numpy as np
import joblib
from django.core.management.base import BaseCommand
from django.db.models import Count
from pathlib import Path
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.metrics import r2_score

from bookings.models import Booking

class Command(BaseCommand):
    help = 'Trains a Polynomial Regression model with advanced features and saves it.'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting regression model training...")

        # 1. Fetch and aggregate data from the database
        self.stdout.write("Fetching booking data from database...")
        booking_counts = Booking.objects.values('check_in').annotate(
            bookings=Count('id')
        ).order_by('check_in')

        if not booking_counts:
            self.stdout.write(self.style.ERROR("No booking data found in the database. Please run 'seed_bookings' first."))
            return

        df = pd.DataFrame(list(booking_counts))
        df = df.rename(columns={'check_in': 'date'})
        df['date'] = pd.to_datetime(df['date'])

        # 2. Advanced Feature Engineering for better accuracy
        self.stdout.write("Performing advanced feature engineering...")
        df['time_index'] = (df['date'] - df['date'].min()).dt.days
        
        # Encode cyclical features using sine/cosine to help the model understand time
        df['day_of_year'] = df['date'].dt.dayofyear
        df['day_of_year_sin'] = np.sin(2 * np.pi * df['day_of_year']/365.25)
        df['day_of_year_cos'] = np.cos(2 * np.pi * df['day_of_year']/365.25)
        
        df['month'] = df['date'].dt.month
        df['month_sin'] = np.sin(2 * np.pi * df['month']/12)
        df['month_cos'] = np.cos(2 * np.pi * df['month']/12)

        # Define features (X) and target (y)
        X = df[['time_index', 'day_of_year_sin', 'day_of_year_cos', 'month_sin', 'month_cos']]
        y = df['bookings']

        # Split data for training and evaluation using a time-based split
        train_size = int(len(df) * 0.8)
        X_train, X_test = X[:train_size], X[train_size:]
        y_train, y_test = y[:train_size], y[train_size:]


        # 3. Train the Model
        self.stdout.write("Training Polynomial Regression model...")
        degree = 2
        model_pipeline = make_pipeline(PolynomialFeatures(degree), LinearRegression())
        model_pipeline.fit(X_train, y_train)
        self.stdout.write("Model training complete.")

        # 4. Evaluate the Model and print accuracy
        y_pred = model_pipeline.predict(X_test)
        accuracy = r2_score(y_test, y_pred)
        self.stdout.write(self.style.SUCCESS(f"Model Accuracy (R-squared): {accuracy:.4f}"))


        # 5. Save the Model
        base_dir = Path(__file__).resolve().parent.parent.parent.parent
        models_dir = base_dir / 'ml' / 'models'
        model_path = models_dir / 'regression_model.pkl'
        models_dir.mkdir(parents=True, exist_ok=True)
        
        joblib.dump(model_pipeline, model_path)
        self.stdout.write(self.style.SUCCESS(f"Successfully trained and saved regression model to {model_path}"))
