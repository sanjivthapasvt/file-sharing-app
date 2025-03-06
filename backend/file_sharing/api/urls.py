from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import FileViewSet, download_file

router = DefaultRouter()
router.register(r'files', FileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('download/<str:share_link>/', download_file, name='download_file'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
