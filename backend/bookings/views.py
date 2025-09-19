# backend/bookings/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from datetime import datetime
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-check_in')

    def perform_create(self, serializer):
        room = serializer.validated_data['room']
        check_in = serializer.validated_data['check_in']
        check_out = serializer.validated_data['check_out']
        nights = (check_out - check_in).days
        total_amount = nights * room.rate_per_night

        serializer.save(user=self.request.user, total_amount=total_amount)

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def check_availability(self, request):
        room_id = request.data.get('room')
        check_in = request.data.get('check_in')
        check_out = request.data.get('check_out')
        
        if not all([room_id, check_in, check_out]):
            return Response(
                {'error': 'Room, check_in, and check_out are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            from hotel.models import Room
            room = Room.objects.get(id=room_id)
            
            # Count overlapping bookings
            overlapping_bookings = Booking.objects.filter(
                room__room_type=room.room_type,
                check_in__lt=check_out,
                check_out__gt=check_in,
                status__in=[Booking.BookingStatus.PENDING, Booking.BookingStatus.CONFIRMED]
            ).count()
            
            is_available = overlapping_bookings < room.quantity
            available_rooms = room.quantity - overlapping_bookings
            
            return Response({
                'is_available': is_available,
                'available_rooms': available_rooms,
                'message': f'{available_rooms} {room.room_type} rooms available for the selected dates.' if is_available 
                          else f'No {room.room_type} rooms available for the selected dates.'
            })
            
        except Room.DoesNotExist:
            return Response(
                {'error': 'Room not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )