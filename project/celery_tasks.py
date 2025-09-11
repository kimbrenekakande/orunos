import os
from celery import shared_task
from django.apps import apps

@shared_task
def crew_task(instance_id, question):
    # Import inside function to avoid circular imports
    from core.crewai_config.crews import get_crew
    
    # Get the model using the app registry
    CourseWork = apps.get_model('core', 'CourseWork')
    
    input = {
        "question": question,
    }
    answer = get_crew().kickoff(input)
    instance = CourseWork.objects.get(id=instance_id)
    instance.answer = answer
    instance.save()
    return answer