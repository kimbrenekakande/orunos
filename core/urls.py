from django.urls import path
from .views import Index, Home, dashboard, List, Billing, Settings

# from .views import Profile

urlpatterns = [
    path("", Index.as_view(), name="index"),
    path("home/", Home.as_view(), name = "home"),
    path("dashboard/", dashboard, name = "dashboard"),
    path("list/", List.as_view(), name = "list"),
    path("billing/", Billing.as_view(), name = "billing"),
    # path("profile/", Profile.as_view(), name = "profile"),
    path("settings/", Settings.as_view(), name = "settings"),
]