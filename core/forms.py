from dataclasses import fields
from tkinter import Widget
from django.forms import ModelForm
from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget
from project import ckeditor5

from .models import CourseWork

class CourseWorkForm(ModelForm):
    class Meta:
        model = CourseWork
        fields = ['question', 'answer']
        widgets = {
            'text' : CKEditor5Widget(attrs ={"class": "django_ckeditor_5"})
        }
