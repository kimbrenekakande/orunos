from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from .forms import QuestionForm, AnswerEditorForm
from django.shortcuts import redirect
from .crewai_config.crews import crew

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
            return redirect('editor')
            form.instance.user = request.user  # associate the question with the current user
            form.instance.question = question
            form.instance.answer = result
            form.save()
    else:
        form = QuestionForm()
        
    return render(request, "home.html", {"form": form},)

class List(TemplateView):
    template_name = "list.html"

class Billing(TemplateView):
    template_name = "billing.html"


class Settings(TemplateView):
    template_name = "settings.html"

def editor_view(request):
    form = AnswerEditorForm()
    
    if request.method == "POST":
        form = AnswerEditorForm(request.POST)
        if form.is_valid():
            form.instance.user = request.user  # associate the question with the current user
            form.save(update_fields=["answer"]) # update the specific field, not the entire object
            return redirect('list')
    return render(request, "editor.html", {"form": form},)