from rest_framework import serializers
from .models import Project, Skill, Experience, Certificate, Education

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'problem_statement', 'task_details', 'my_solution', 'image_url', 'project_url', 'github_url', 'created_at']
        read_only_fields = ['id', 'created_at']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']
        read_only_fields = ['id']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'role', 'company', 'company_url', 'duration', 'description', 'problem_statement', 'task_details', 'my_solution']
        read_only_fields = ['id']

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'title', 'issuing_organization', 'issue_date', 'certificate_url', 'credential_id']
        read_only_fields = ['id']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'institution', 'degree', 'field_of_study', 'start_date', 'end_date', 'description', 'is_current']
        read_only_fields = ['id']
