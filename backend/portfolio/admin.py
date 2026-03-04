from django.contrib import admin
from .models import Project, Skill, Experience, Certificate, Education

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'project_url')
    search_fields = ('title', 'description', 'problem_statement', 'task_details', 'my_solution')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'created_at')
        }),
        ('Details', {
            'fields': ('problem_statement', 'task_details', 'my_solution'),
            'classes': ('collapse',)
        }),
        ('Links', {
            'fields': ('image_url', 'project_url', 'github_url')
        }),
    )
    
    actions = ['delete_selected']
    
    def get_actions(self, request):
        actions = super().get_actions(request)
        return actions

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('name',)
    list_filter = ('category',)
    ordering = ('name',)
    
    fields = ('name', 'category')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'duration')
    search_fields = ('role', 'company')
    ordering = ('company',)
    
    fieldsets = (
        ('Position Information', {
            'fields': ('role', 'company', 'company_url', 'duration')
        }),
        ('Details', {
            'fields': ('description', 'problem_statement', 'task_details', 'my_solution'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['delete_selected']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuing_organization', 'issue_date')
    search_fields = ('title', 'issuing_organization')
    list_filter = ('issue_date',)
    ordering = ('-issue_date',)
    
    fieldsets = (
        ('Certificate Information', {
            'fields': ('title', 'issuing_organization', 'issue_date')
        }),
        ('Additional Details', {
            'fields': ('certificate_url', 'credential_id'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['delete_selected']

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'start_date', 'end_date', 'is_current')
    search_fields = ('degree', 'institution')
    list_filter = ('is_current', 'start_date')
    ordering = ('-start_date',)
    
    fieldsets = (
        ('Education Information', {
            'fields': ('degree', 'institution', 'field_of_study')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date', 'is_current')
        }),
        ('Description', {
            'fields': ('description',),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['delete_selected']

