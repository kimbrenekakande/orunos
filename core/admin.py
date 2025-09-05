from django.contrib import admin
from .models import *

#unfold
from unfold.admin import ModelAdmin

#django import export
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm


# Register your models here.
class  CourseWorkAdmin(ModelAdmin):
    model = CourseWork
    list_display = [
        '__str__',
        'created',
        'user',
    ]
    import_form_class = ImportForm
    export_form_class = ExportForm
    

admin.site.register(CourseWork, CourseWorkAdmin)