from django.urls import path
from .views import HotelSearchView

urlpatterns = [
    path('hotel-search/', HotelSearchView.as_view(), name='hotel-search'),
]