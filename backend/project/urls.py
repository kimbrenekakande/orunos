

from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static #<--CKEditor Settings | turns default text editor to word processor like
from core.api import api

urlpatterns = [
    #django admin
    path("admin/", admin.site.urls),
    #user management
    
    #local apps
    path("accounts/", include("accounts.urls")),
    path("",include("core.urls")),
    path('accounts/', include('allauth.urls')),
    path("api/", api.urls),#<--django apis
]

if settings.DEBUG:
    # Include django_browser_reload URLs only in DEBUG mode
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]

urlpatterns += [
    path("ckeditor5/", include('django_ckeditor_5.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
