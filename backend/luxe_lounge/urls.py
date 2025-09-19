# backend/luxe_lounge/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Default Django admin is still available
    path('admin/', admin.site.urls),
    
    # Custom admin dashboard and login flow are now the root
    path('', include('dashboard.urls')), 
    
    # API endpoints for the React frontend
    path('api/', include('hotel.urls')),
    path('api/', include('bookings.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
]
