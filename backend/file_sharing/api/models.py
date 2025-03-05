from django.db import models
from django.contrib.auth.models import User

class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True,blank=True)
    file = models.FileField(upload_to="uploads/")
    share_link = models.CharField(max_length=200, unique=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    downloads = models.IntegerField(default=0)
    
    def __str__(self):
        return self.file.name