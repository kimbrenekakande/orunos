from pathlib import Path
from django.urls import path
from .views import index, home, dashboard, List, Billing, Settings, CoursewokDetailView, EditView

# from .views import Profile

urlpatterns = [
    path("", index, name="index"),
    path("home/", home, name = "home"),
    path("dashboard/", dashboard, name = "dashboard"),
    path("list/", List.as_view(), name = "list"),
    path("billing/", Billing.as_view(), name = "billing"),
    # path("profile/", Profile.as_view(), name = "profile"),
    path("settings/", Settings.as_view(), name = "settings"),
    path("editor/<int:pk>", EditView.as_view(), name = "editor"),
    path('coursework/<int:pk>', CoursewokDetailView.as_view(), name="coursework")
]