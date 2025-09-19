# backend/dashboard/urls.py

from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    # Auth
    path('', views.custom_login_view, name='login'),
    path('logout/', views.custom_logout_view, name='logout'),
    
    # Main Pages
    # path('login/', views.custom_login_view, name='login'),
    path('dashboard', views.dashboard_view, name='dashboard'),
    path('bookings/', views.booking_list_view, name='booking_list'),
    path('rooms/', views.room_list_view, name='room_list'),
    path('users/', views.user_list_view, name='user_list'),

    # Room CRUD (Delete path removed)
    path('rooms/new/', views.room_create_view, name='room_create'),
    path('rooms/<int:pk>/edit/', views.room_update_view, name='room_update'),
    
    # API
    path('api/forecast-data/', views.forecast_api_view, name='forecast_data'),
    path('api/retrain-model/', views.retrain_model_view, name='retrain_model'),
]

