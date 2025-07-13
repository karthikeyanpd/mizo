from django import forms
from .models import Booking

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = [
            'hotel',
            'name',
            'email',
            'phone',
            'check_in',
            'check_out',
            'adults',
            'children',
            'rooms',
            'special_requests',
            'payment_method',
        ]
