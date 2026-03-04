from rest_framework import serializers
from .models import Project, Skill, Experience, Certificate, Education

class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='_id', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'problem_statement', 'task_details', 'my_solution', 'image_url', 'project_url', 'github_url', 'created_at']

class SkillSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='_id', read_only=True)
    
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']

class ExperienceSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='_id', read_only=True)
    
    class Meta:
        model = Experience
        fields = ['id', 'role', 'company', 'company_url', 'duration', 'description', 'problem_statement', 'task_details', 'my_solution']

class CertificateSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='_id', read_only=True)
    
    class Meta:
        model = Certificate
        fields = ['id', 'title', 'issuing_organization', 'issue_date', 'certificate_url', 'credential_id']

class EducationSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='_id', read_only=True)
    
    class Meta:
        model = Education
        fields = ['id', 'institution', 'degree', 'field_of_study', 'start_date', 'end_date', 'description', 'is_current']
