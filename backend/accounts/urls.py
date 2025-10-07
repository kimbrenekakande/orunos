from os import name
from profile import Profile
from django.urls import path
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [
    # Authentication URLs
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    
    # Profile URLs
    path('profile/', ProfileView, name='profile'),
    path('profile-edit/', profile_edit, name='profile_edit'),
]
