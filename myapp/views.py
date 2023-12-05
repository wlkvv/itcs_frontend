from django.shortcuts import render, redirect
from datetime import date
from myapp.models import *


def GetServices(request):
    keyword = request.GET.get('keyword')
    services = Service.objects.filter(status=1)

    if keyword:
         services = Service.objects.filter(status=1).filter(title__icontains=keyword)

    context = {
        'current_date': date.today(),
        'services': services,
        "search_query": keyword if keyword else ""
    }

    return render(request, 'services.html', context)


def GetService(request, id):
    context = {
        'current_date': date.today(),
        'service': Service.objects.get(id=id)
    }

    return render(request, 'service.html', context)


def DeleteService(request, id):
    reactor = Service.objects.get(id=id)
    reactor.delete()

    return redirect("/")
