from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import FileSerializer
from .models import File

class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        file = get_object_or_404(File, pk=pk)
        serializer = FileSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        file = get_object_or_404(File, pk=pk)
        file.delete()
        return Response({"message": "File deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from .models import File

def download_file(request, share_link):
    #Serve file and increase the download count
    file_obj = get_object_or_404(File, share_link=share_link)

    # check if file is expired
    if file_obj.is_expired():
        return Http404("This file has expired.")

    # Increase downloads count
    file_obj.downloads += 1
    file_obj.save(update_fields=['downloads']) 

    # Serve the file
    return FileResponse(file_obj.file.open('rb'), as_attachment=True)
