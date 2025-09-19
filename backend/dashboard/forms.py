# backend/dashboard/forms.py

from django import forms
from hotel.models import Room

class RoomForm(forms.ModelForm):
    class Meta:
        model = Room
        fields = ['room_type', 'rate_per_night', 'description', 'quantity']
        widgets = {
            'room_type': forms.TextInput(attrs={'class': 'w-full px-3 py-2 border border-slate-300 rounded-lg'}),
            'rate_per_night': forms.NumberInput(attrs={'class': 'w-full px-3 py-2 border border-slate-300 rounded-lg'}),
            'description': forms.Textarea(attrs={'class': 'w-full px-3 py-2 border border-slate-300 rounded-lg', 'rows': 4}),
            'quantity': forms.NumberInput(attrs={'class': 'w-full px-3 py-2 border border-slate-300 rounded-lg'}),
        }
    