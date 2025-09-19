# backend/bookings/serializers.py
from rest_framework import serializers
from .models import Booking
from django.db.models import Q
from datetime import datetime

class BookingSerializer(serializers.ModelSerializer):
    room_type = serializers.CharField(source='room.room_type', read_only=True)
    is_available = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'room', 'room_type', 'check_in', 'check_out', 
            'adults', 'children', 'status', 'total_amount', 'created_at', 'is_available'
        ]
        read_only_fields = ['user', 'status', 'total_amount', 'is_available']

    def get_is_available(self, obj):
        # This method will be used to check availability before creating a booking
        if hasattr(obj, 'availability_checked'):
            return obj.availability_checked
        
        # For existing objects, we don't need to check availability
        if obj.pk:
            return True
            
        # Check availability for new bookings
        room = obj.room
        check_in = obj.check_in
        check_out = obj.check_out
        
        # Count overlapping bookings for the same room type
        overlapping_bookings = Booking.objects.filter(
            room__room_type=room.room_type,
            check_in__lt=check_out,
            check_out__gt=check_in,
            status__in=[Booking.BookingStatus.PENDING, Booking.BookingStatus.CONFIRMED]
        ).count()
        
        # Check if there are available rooms
        return overlapping_bookings < room.quantity

    def validate(self, data):
        if data['check_out'] <= data['check_in']:
            raise serializers.ValidationError("Check-out date must be after check-in date.")

        room = data['room']
        check_in = data['check_in']
        check_out = data['check_out']
        
        # Count overlapping bookings for the same room type
        overlapping_bookings = Booking.objects.filter(
            room__room_type=room.room_type,
            check_in__lt=check_out,
            check_out__gt=check_in,
            status__in=[Booking.BookingStatus.PENDING, Booking.BookingStatus.CONFIRMED]
        )
        
        # Exclude current booking if updating
        if self.instance:
            overlapping_bookings = overlapping_bookings.exclude(id=self.instance.id)
            
        overlapping_count = overlapping_bookings.count()
        
        if overlapping_count >= room.quantity:
            raise serializers.ValidationError(
                f"Only {room.quantity} {room.room_type} rooms available. "
                f"{overlapping_count} already booked for the selected dates."
            )
            
        return data

    def create(self, validated_data):
        room = validated_data['room']
        check_in = validated_data['check_in']
        check_out = validated_data['check_out']
        nights = (check_out - check_in).days
        total_amount = nights * room.rate_per_night

        # Set availability_checked flag to avoid re-checking in get_is_available
        booking = Booking(**validated_data)
        booking.availability_checked = True
        booking.total_amount = total_amount
        booking.save()
        
        return booking