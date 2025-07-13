from django.shortcuts import render, redirect
from .forms import BookingForm
from .models import Hotel

# Home page view (shows all hotels)
def index(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/index.html', {'hotels': hotels})


def kolkata(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/kolkata.html',{'hotels':hotels})

def banglore(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/banglore.html',{'hotels':hotels})

def chennai(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/chennai.html',{'hotels':hotels})

def delhi(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/delhi.html',{'hotels':hotels})

def hydrabad(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/hydrabad.html',{'hotels':hotels})

def madurai(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/madurai.html',{'hotels':hotels})

def noida(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/noida.html',{'hotels':hotels})

def pune(request):
    hotels = Hotel.objects.all()
    return render(request, 'mizoapp/pune.html',{'hotels':hotels})
    
# Booking form view
def booking(request):
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        hotel_id = request.GET.get('hotel')  # Get hotel ID from URL
        form = BookingForm(initial={'hotel': hotel_id})  # Pre-fill form with hotel

    return render(request, 'mizoapp/booking.html', {'form': form})
