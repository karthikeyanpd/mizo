from django.contrib import admin

# Register your models here.
from .models import Hotel, Booking

admin.site.register(Hotel)
admin.site.register(Booking)