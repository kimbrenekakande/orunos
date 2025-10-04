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
    
    try:
        # Get the crew output
        crew_output = get_crew().kickoff(input)
        
        # Convert to string if it's not already
        answer_str = str(crew_output) if crew_output is not None else ""
        
        # Update the instance
        instance = CourseWork.objects.get(id=instance_id)
        instance.answer = answer_str
        instance.save()
        return answer_str
    except Exception as e:
        # Log the error and update the instance with error message if needed
        error_msg = f"Error processing request: {str(e)}"
        instance = CourseWork.objects.get(id=instance_id)
        instance.answer = error_msg
        instance.save()
        return error_msg