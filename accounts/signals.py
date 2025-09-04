from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Profile
from project.settings import AUTH_USER_MODEL

user_model = AUTH_USER_MODEL


@receiver(post_save, sender=user_model)
def user_saved(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


# @receiver(post_save, sender=user_model)
# def save_profile(sender, instance, **kwargs):
#     instance.profile.save()
