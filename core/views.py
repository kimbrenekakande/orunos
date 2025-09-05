from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from .forms import QuestionForm
from django.shortcuts import redirect

# Create your views here.

class Index(TemplateView):
    template_name = "index.html"

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

def home(request):
    if request.method == "POST":
        form = QuestionForm(request.POST)
        if form.is_valid():
            form.instance.user = request.user  # associate the question with the current user
            form.save()
            return redirect('editor')
    else:
        form = QuestionForm()
        
    return render(request, "home.html", {"form": form},)

class List(TemplateView):
    template_name = "list.html"

class Billing(TemplateView):
    template_name = "billing.html"


class Settings(TemplateView):
    template_name = "settings.html"

class Editor(TemplateView):
    template_name = "editor.html"