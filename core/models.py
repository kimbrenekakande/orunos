from accounts.models import CustomUser
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

# Create your models here.
class CourseWork(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    question = models.TextField(max_length=500, blank = True, null=True)
    answer = CKEditor5Field(config_name='extends', blank = True , null=True)
    created = models.DateTimeField(auto_now_add = True,)
    
    def __str__(self) -> str:
        return self.question
    