from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('identifyPlate', views.identify_plate, name='identify-plate'),
]
