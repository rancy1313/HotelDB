from django.urls import path
from .views import *

urlpatterns = [
    path('hotel-search/', HotelSearchView.as_view(), name='hotel-search'),
    path('get-hotel/', HotelInfoView.as_view(), name='get-hotel'),
]