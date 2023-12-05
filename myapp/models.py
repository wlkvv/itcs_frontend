from datetime import datetime
from django.db import models, connection
from django.utils import timezone
from rest_framework.reverse import reverse
from django.contrib.postgres.fields import ArrayField

class Service(models.Model):
    title = models.CharField(max_length=255)
    time = models.CharField(max_length=255)
    summary = models.CharField(max_length=255, blank=True)
    price = models.IntegerField()
    due_date = models.CharField(max_length=255)
    image = models.TextField(blank=True)
    info = models.TextField(blank=True)
    includes = ArrayField(models.TextField(blank=True, null=True))

    STATUS_CHOICES = [
        (1, 'Enabled'),
        (2, 'Deleted'),
    ]
    status = models.IntegerField(default=1, choices=STATUS_CHOICES)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("service_details", kwargs={"id": self.id})

    def get_delete_url(self):
        return reverse("service_delete", kwargs={"id": self.id})

    def delete(self):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE myapp_service SET status = 2 WHERE id = %s", [self.pk])


class Application(models.Model):
    STATUS_CHOICES = [
        (1, 'Зарегистрирован'),
        (2, 'Проверяется'),
        (3, 'Принято'),
        (4, 'Отказано'),
        (5, 'Удалено')
    ]

    services = models.ManyToManyField(Service, verbose_name="Сервисы", null=True)

    status = models.CharField(max_length=255, blank=True, null=True, choices=STATUS_CHOICES)
    creation_date = models.DateField(default=datetime.now(tz=timezone.utc))
    approving_date = models.DateField(default=datetime.now(tz=timezone.utc))
    publication_date = models.DateField(default=datetime.now(tz=timezone.utc))

    def __str__(self):
        return "Application №" + str(self.pk)


