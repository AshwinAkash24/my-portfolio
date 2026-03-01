from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, SkillViewSet, ExperienceViewSet, CertificateViewSet, EducationViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'certificates', CertificateViewSet)
router.register(r'education', EducationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
