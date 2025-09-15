from dataclasses import fields
from django.forms import ModelForm
from django import forms

from .models import CourseWork

class CourseWorkForm(ModelForm):
    class Meta:
        model = CourseWork
        fields = ['question', 'answer']
