from ninja import ModelSchema
from core.models import CourseWork

class CourseWorkSchema(ModelSchema):
    class Meta:
        model = CourseWork
        fields = ['id', 'question', 'answer', 'created']