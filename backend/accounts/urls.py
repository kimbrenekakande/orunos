from os import name
from profile import Profile
from django.urls import path
from .views import *


urlpatterns = [
        path("profile", ProfileView, name="profile"),
        path("profile-edit", profile_edit, name='profile_edit' ),
    ]
