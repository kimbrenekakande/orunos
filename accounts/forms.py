from tkinter import Image
from django.forms import ModelForm, widgets
from django import forms
from .models import Profile


class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        exclude = ["user"]
        widgets = {
            "image": forms.FileInput(),
            "first_name": forms.TextInput(attrs={"placeholder": "eg. Jone"}),
            "last_name": forms.TextInput(attrs={"placeholder": "eg. Mukasa"}),
            "institution": forms.TextInput(attrs={"placeholder": "eg. Makerere"}),
            "course": forms.TextInput(attrs={"placeholder": "eg. Computer Science"}),
            "year": forms.TextInput(attrs={"placeholder": "eg. Mukasa"}),
        }
