# from pyexpat import model
from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView, ListView
from .crewai_config.crews import get_crew


from django.contrib.auth.decorators import login_required
from .forms import CourseWorkForm
from django.shortcuts import redirect
from .models import CourseWork


class Index(TemplateView):
    template_name = "index.html"


@login_required
def dashboard(request):
    return render(request, "dashboard.html")


def home(request):
    if request.method == "POST":
        from project.celery_tasks import crew_task

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
            get_crew(form.instance.id, form.instance.question)
            # crew_task.delay(form.instance.id, form.instance.question) #pass it to the crew
            return redirect("editor", pk=form.instance.id)
    else:
        form = CourseWorkForm()
    return render(request, "home.html", {"form": form})



def editor_view(request, pk):
    coursework = get_object_or_404(CourseWork, pk=pk)
    form = CourseWorkForm(instance=coursework)

    if request.method == "POST":
        form = CourseWorkForm(request.POST, instance=coursework)
        if form.is_valid():
            form.save()
            return redirect("list")  # This now correctly redirects to the list view
    return render(request, "editor.html", {"form": form, "coursework": coursework})


class List(ListView):
    model = CourseWork
    template_name = "list.html"


class Billing(TemplateView):
    template_name = "billing.html"


class Settings(TemplateView):
    template_name = "settings.html"
