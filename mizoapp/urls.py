from django.urls import path
from . import views
from django.http import HttpResponseRedirect
from django.views.generic.base import RedirectView
# 👇 Redirect from /city/<city_name>/ to /<city_name>/
def city_redirect(request, city_name):
    return HttpResponseRedirect(f'/{city_name}/')

urlpatterns = [
    path('', views.index, name='index'),
    path('city/<str:city_name>/', city_redirect),  # ✅ Add this line back
    path('banglore/', views.banglore, name='banglore'),
    path('booking', RedirectView.as_view(url='/booking/')),
    path('booking/', views.booking, name='booking'),
    path('chennai/', views.chennai, name='chennai'),
    path('delhi/', views.delhi, name='delhi'),
    path('hydrabad/', views.hydrabad, name='hydrabad'),
    path('index/', views.index, name='index'),
    path('kolkata/', views.kolkata, name='kolkata'),
    path('madurai/', views.madurai, name='madurai'),
    path('noida/', views.noida, name='noida'),
    path('pune/', views.pune, name='pune'),
]

