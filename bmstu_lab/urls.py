from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.GetServices, name='services'),
    path('service/<int:id>/', views.GetService, name='service_details'),
    path('service/<int:id>/delete/', views.DeleteService, name='service_delete'),
]


