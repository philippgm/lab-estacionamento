from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from .models import *


def index(request):
    return render(request, 'placas/index.html')


def identify_plate(request):
    
    data_obj = {
        'client': 'Cliente não Cadastrado',
        'plate': 'Não identificada',
        'manufacturer': 'Veículo não cadastrado',
        'model': 'Veículo não cadastrado'
    }

    try:
        img_file = request.FILES['img_file']
    except KeyError:
        return HttpResponseBadRequest('Required parameter "img_file" not found')

    # TODO: Create function to identify the plate from the img_file
    plate = 'GAE0244'

    data_obj['plate'] = plate

    try:
        vehicle = Vehicle.objects.get(plate=plate)
    except Vehicle.DoesNotExist:
        vehicle = None

    if vehicle is not None:
        data_obj['manufacturer'] = vehicle.manufacturer
        data_obj['model'] = vehicle.model
        if vehicle.owner is not None:
            data_obj['client'] = vehicle.owner.name

    return JsonResponse(data_obj)
