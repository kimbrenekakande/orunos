from django.contrib import admin
from .models import CustomUser, Profile

#unfold
from unfold.admin import ModelAdmin

#django import export
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm



# Register your models here.
class CustomUserAdmin(ModelAdmin, ImportExportModelAdmin):
    model = CustomUser
    list_display = ("username", "email", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")
    search_fields = ("username", "email")
    ordering = ("username", "email")
    import_form_class = ImportForm
    export_form_class = ExportForm

class ProfileAdmin(ModelAdmin, ImportExportModelAdmin):
    model = Profile
    list_display = (
        "user",
        "full_name",
        "phone_number",
        "institution",
        "course",
        "year",
    )
    list_filter = ("institution", "course", "year")
    search_fields = ("user__username", "user__email", "full_name")
    ordering = ("user__username", "institution", "course", "year")
    import_form_class = ImportForm
    export_form_class = ExportForm


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Profile, ProfileAdmin)
