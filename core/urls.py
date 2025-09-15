from django.urls import path
from .views import Index, home, dashboard, List, Billing, Settings, editor_view

# from .views import Profile

urlpatterns = [
    path("", Index.as_view(), name="index"),
    path("home/", home, name = "home"),
    path("dashboard/", dashboard, name = "dashboard"),
    path("list/", List.as_view(), name = "list"),
    path("billing/", Billing.as_view(), name = "billing"),
    # path("profile/", Profile.as_view(), name = "profile"),
    path("settings/", Settings.as_view(), name = "settings"),
    path("editor/<int:pk>", editor_view, name = "editor"),
]