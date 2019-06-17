from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Vehicle(models.Model):
    owner = models.ForeignKey(Client, on_delete=models.CASCADE)
    plate = models.CharField(max_length=7)
    model = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)

    def __str__(self):
        return self.manufacturer + ' ' + self.model + ' - ' + self.plate
