from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    model = File
    fields = '__all__'
