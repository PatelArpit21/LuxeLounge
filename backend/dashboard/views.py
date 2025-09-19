# backend/dashboard/views.py

import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from datetime import timedelta

from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from django.db.models import Sum, Q
from django.http import JsonResponse
from django.core.management import call_command
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test

from hotel.models import Room
from bookings.models import Booking
from accounts.models import FrontendUser
from .forms import RoomForm

# Helper function to ensure only staff can access dashboard pages
def is_staff_user(user):
    return user.is_staff

def custom_login_view(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('dashboard:dashboard')

    error = None
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            return redirect('dashboard:dashboard')
        else:
            error = "Invalid credentials or not an admin account."

    return render(request, 'admin/login.html', {'error': error})

@login_required
def custom_logout_view(request):
    if request.method == 'POST':
        logout(request)
    return redirect('dashboard:login')

@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def dashboard_view(request):
    thirty_days_ago = timezone.now() - timedelta(days=30)
    revenue_data = Booking.objects.filter(status__in=[Booking.BookingStatus.CONFIRMED, Booking.BookingStatus.COMPLETED], created_at__gte=thirty_days_ago).aggregate(total_revenue=Sum('total_amount'))
    revenue_30_days = revenue_data['total_revenue'] or 0
    new_bookings_30_days = Booking.objects.filter(created_at__gte=thirty_days_ago).count()
    upcoming_checkins = Booking.objects.filter(status=Booking.BookingStatus.CONFIRMED, check_in__gte=timezone.now().date()).count()
    total_rooms = Room.objects.aggregate(total_quantity=Sum('quantity'))['total_quantity'] or 0
    total_available_room_nights = total_rooms * 30
    booked_nights = 0
    recent_bookings_qs = Booking.objects.filter(status__in=[Booking.BookingStatus.CONFIRMED, Booking.BookingStatus.COMPLETED], check_in__gte=thirty_days_ago.date())
    for booking in recent_bookings_qs:
        nights = (booking.check_out - booking.check_in).days
        booked_nights += nights
    occupancy_rate = (booked_nights / total_available_room_nights * 100) if total_available_room_nights > 0 else 0
    recent_bookings_list = Booking.objects.order_by('-created_at')[:5]
    context = {
        'recent_bookings': recent_bookings_list,
        'revenue_30_days': f"{revenue_30_days:,.2f}",
        'new_bookings_30_days': new_bookings_30_days,
        'occupancy_rate': f"{occupancy_rate:.1f}%",
        'upcoming_checkins': upcoming_checkins,
    }
    return render(request, 'admin/dashboard.html', context)

@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def booking_list_view(request):
    query = request.GET.get('q', '')
    bookings = Booking.objects.all()
    if query:
        bookings = bookings.filter(
            Q(user__email__icontains=query) | 
            Q(room__room_type__icontains=query)
        )
    context = {'bookings': bookings.order_by('-check_in'), 'query': query}
    return render(request, 'admin/bookings.html', context)

@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def room_list_view(request):
    all_rooms = Room.objects.all().order_by('room_type')
    context = {'rooms': all_rooms}
    return render(request, 'admin/rooms.html', context)

@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def user_list_view(request):
    query = request.GET.get('q', '')
    users = FrontendUser.objects.filter(is_staff=False, is_superuser=False)
    if query:
        users = users.filter(email__icontains=query)
    context = {'users': users.order_by('-date_joined'), 'query': query}
    return render(request, 'admin/users.html', context)
    
@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def forecast_api_view(request):
    base_dir = Path(__file__).resolve().parent.parent
    model_path = base_dir / 'ml' / 'models' / 'regression_model.pkl'
    if not model_path.exists():
        return JsonResponse({'error': 'Model not found. Please run the training command.'}, status=404)
    first_booking = Booking.objects.order_by('check_in').first()
    if not first_booking:
        return JsonResponse({'error': 'No booking data available to create a forecast.'}, status=404)
    model = joblib.load(model_path)
    start_date = timezone.now().date()
    first_booking_date = pd.to_datetime(first_booking.check_in)
    future_dates = pd.to_datetime([start_date + timedelta(days=i) for i in range(90)])
    future_df = pd.DataFrame({'date': future_dates})
    future_df['time_index'] = (future_df['date'] - first_booking_date).dt.days
    future_df['day_of_year'] = future_df['date'].dt.dayofyear
    future_df['day_of_year_sin'] = np.sin(2 * np.pi * future_df['day_of_year']/365.25)
    future_df['day_of_year_cos'] = np.cos(2 * np.pi * future_df['day_of_year']/365.25)
    future_df['month'] = future_df['date'].dt.month
    future_df['month_sin'] = np.sin(2 * np.pi * future_df['month']/12)
    future_df['month_cos'] = np.cos(2 * np.pi * future_df['month']/12)
    X_future = future_df[['time_index', 'day_of_year_sin', 'day_of_year_cos', 'month_sin', 'month_cos']]
    predictions = model.predict(X_future)
    predictions[predictions < 0] = 0
    predictions = predictions.round().astype(int)
    response_data = {'dates': [d.strftime('%Y-%m-%d') for d in future_dates], 'forecast': predictions.tolist()}
    return JsonResponse(response_data)

@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def retrain_model_view(request):
    try:
        call_command('train_regression_model')
        return JsonResponse({'status': 'success', 'message': 'Model retraining initiated.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

# --- Room CRUD Views ---

@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def room_create_view(request):
    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard:room_list')
    else:
        form = RoomForm()
    return render(request, 'admin/room_form.html', {'form': form, 'action': 'Create'})

@login_required(login_url='/login/')
@user_passes_test(is_staff_user, login_url='/login/')
def room_update_view(request, pk):
    room = get_object_or_404(Room, pk=pk)
    if request.method == 'POST':
        form = RoomForm(request.POST, instance=room)
        if form.is_valid():
            form.save()
            return redirect('dashboard:room_list')
    else:
        form = RoomForm(instance=room)
    return render(request, 'admin/room_form.html', {'form': form, 'action': 'Update'})

