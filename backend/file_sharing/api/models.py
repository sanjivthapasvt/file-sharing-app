from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils.timezone import now
from datetime import timedelta
from django.utils import timezone
import os

def two_days_later():
    return timezone.now() + timedelta(days=2)

def generate_unique_link():
    return str(uuid.uuid4())

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    file = models.FileField(upload_to="uploads/")
    share_link = models.CharField(max_length=200, unique=True, default=generate_unique_link, editable=False)
    expires_at = models.DateTimeField(default=two_days_later)
    downloads = models.IntegerField(default=0, editable=False)
    
    def save(self, *args, **kwargs):
        if not self.share_link:
            self.share_link = generate_unique_link()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.file.name
    
    def is_expired(self):
        return self.expires_at and self.expires_at < now()
    
    def delete(self, *args, **kwargs):
        # Delete the file from storage
        if self.file:
            if os.path.isfile(self.file.path):
                os.remove(self.file.path)
        
        super().delete(*args, **kwargs)