from django.contrib import admin
from django.urls import path, include
from placas import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('placas/', include('placas.urls')),
    path('', views.index, name='index'),
    path('index', views.index, name='index'),
]
