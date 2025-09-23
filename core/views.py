# from pyexpat import model
from dataclasses import fields
from os import name
from pyexpat import model
from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import TemplateView, ListView, DetailView,UpdateView
from .crewai_config.crews import get_crew
from .data import features


from django.contrib.auth.decorators import login_required
from .forms import CourseWorkForm
from django.shortcuts import redirect
from .models import CourseWork


def index(request):
    template_name = "index.html"
    context = {
        "features": features
    }
    return render(request, template_name, context)


@login_required
def dashboard(request):
    return render(request, "dashboard.html")


def home(request):
    if request.method == "POST":
        from project.celerytasks import crew_task

        form = CourseWorkForm(request.POST)
        if form.is_valid():
            form.instance.user = (
                request.user
            )  # associate the question with the current user
            form.instance.question = form.cleaned_data[
                "question"
            ]  # access the question from the form
            form.save()
            print(form.instance.question)
            # get_crew(form.instance.id, form.instance.question)
            crew_task.delay(form.instance.id, form.instance.question) #pass it to the crew
            return redirect("editor", pk=form.instance.id)
    else:
        form = CourseWorkForm()
    return render(request, "home.html", {"form": form})



class CoursewokDetailView(DetailView):
    model = CourseWork
    context_object_name = "coursework"
    template_name = "coursework.html"

    

class EditView(UpdateView):
    form_class = CourseWorkForm
    model = CourseWork
    template_name = 'editor.html'
    
    def get_success_url(self):
        return reverse_lazy('editor', kwargs={'pk': self.object.pk})
        


class List(ListView):
    name = "coursework_list"
    model = CourseWork
    template_name = "list.html"


class Billing(TemplateView):
    template_name = "billing.html"


class Settings(TemplateView):
    template_name = "settings.html"
