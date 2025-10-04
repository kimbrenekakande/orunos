from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile_pics", default="images/default_dp.jpg")
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    institution = models.CharField(max_length=100, blank=True, null=True)
    course = models.CharField(max_length=100, blank=True, null=True)
    year = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.user)

    @property
    def full_name(self):
        if self.first_name:
            return self.first_name + " " + self.last_name
        else:
            return self.user.username

    @property
    def avatar(self):
        try:
            return self.image.url
        except ValueError:
            return "theme/static/images/default_dp.jpg"
