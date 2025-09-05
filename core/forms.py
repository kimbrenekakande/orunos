from django.forms import ModelForm
from django import forms

from .models import CourseWork

class QuestionForm(ModelForm):
    class Meta:
        model = CourseWork
        fields = ['question', 'answer']
