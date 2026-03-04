from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField

class Project(models.Model):
    id = ObjectIdAutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    problem_statement = models.TextField(blank=True, null=True)
    task_details = models.TextField(blank=True, null=True)
    my_solution = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    project_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Skill(models.Model):
    id = ObjectIdAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, default='General')

    def __str__(self):
        return self.name

class Experience(models.Model):
    id = ObjectIdAutoField(primary_key=True)
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    company_url = models.URLField(blank=True, null=True)
    duration = models.CharField(max_length=100)
    description = models.TextField()
    problem_statement = models.TextField(blank=True, null=True)
    task_details = models.TextField(blank=True, null=True)
    my_solution = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.role} at {self.company}"

class Certificate(models.Model):
    id = ObjectIdAutoField(primary_key=True)
    title = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    issue_date = models.DateField()
    certificate_url = models.URLField(blank=True, null=True)
    credential_id = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.title} - {self.issuing_organization}"

class Education(models.Model):
    id = ObjectIdAutoField(primary_key=True)
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_current = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.degree} at {self.institution}"
