from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils.timezone import now


def generate_unique_link():
    return str(uuid.uuid4())
class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True,blank=True)
    file = models.FileField(upload_to="uploads/")
    share_link = models.CharField(max_length=200, unique=True, default=generate_unique_link, editable=False)
    expires_at = models.DateTimeField(null=True, blank=True)
    downloads = models.IntegerField(default=0, editable=False)
    
    def __str__(self):
        return self.file.name
    
    def is_expired(self):
        return self.expires_at and self.expires_at < now()