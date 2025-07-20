from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=150)
    surname = models.CharField(max_length=150)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.username
