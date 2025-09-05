from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

# Create your views here.

class Index(TemplateView):
    template_name = "index.html"

@login_required
def dashboard(request):
    return render(request, 'dashboard.html')

class Home(TemplateView):
    template_name = "home.html"

class List(TemplateView):
    template_name = "list.html"

class Billing(TemplateView):
    template_name = "billing.html"


class Settings(TemplateView):
    template_name = "settings.html"

    
    

def question_view(request):
    form = QuestionForm(instance=request.user.profile)
    
    if request.method == "POST":
        form = QuestionForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            # return redirect('profile')
        
    return render(request, "qn.html", {"form": form},)