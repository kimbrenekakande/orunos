from ninja import NinjaAPI
from .schemas import CourseWorkSchema
from .models import CourseWork

api = NinjaAPI()

@api.get("coursework/", response=list[CourseWorkSchema])
def get_coursework(request):
    return list(CourseWork.objects.all())

