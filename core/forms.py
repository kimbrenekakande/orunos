from dataclasses import fields
from tkinter import Widget
from django.forms import ModelForm
from django_ckeditor_5.widgets import CKEditor5Widget

from .models import CourseWork

class CourseWorkForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["question"].required = False
        self.fields["answer"].required = False
        self.fields["answer"].widget = CKEditor5Widget(attrs={"class": "django_ckeditor_5"}, config_name="extends")
    
    class Meta:
        model = CourseWork
        fields = ['question', 'answer']