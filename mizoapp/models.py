from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    review_count = models.IntegerField()
    image = models.ImageField(upload_to='hotel_images/')
    description = models.TextField(blank=True)
    rating = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.city}"

class Booking(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.IntegerField()
    children = models.IntegerField(default=0)
    rooms = models.IntegerField()
    special_requests = models.TextField(blank=True, null=True)
    payment_method = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking by {self.name} at {self.hotel.name}"
