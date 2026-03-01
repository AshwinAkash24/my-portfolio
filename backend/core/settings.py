"""
Django settings for core project.
"""

import os
from pathlib import Path
from urllib.parse import quote_plus

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ─── Security ────────────────────────────────────────────────────────────────

SECRET_KEY = os.environ.get(
    'SECRET_KEY',
    'django-insecure-rlc-dxv_^2om3(xo&@d5s2onev96zy72j63((*e%so4&!#@ug!'
)

DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1,my-portfolio-n28w.onrender.com').split(',')

# ─── Applications ────────────────────────────────────────────────────────────

INSTALLED_APPS = [
    'django_mongodb_backend',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api',
    'portfolio',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',   # ← WhiteNoise for static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# ─── Database (MongoDB Atlas) ─────────────────────────────────────────────────

MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD', 'ashwin@2005#')

DATABASES = {
    'default': {
        'ENGINE': 'django_mongodb_backend',
        'NAME': 'portfolio_db',
        'HOST': 'mongodb+srv://admin123:' + quote_plus(MONGO_PASSWORD) + '@cluster0.0q7eyfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        'OPTIONS': {
            'connectTimeoutMS': 60000,
            'socketTimeoutMS': 60000,
            'serverSelectionTimeoutMS': 60000,
            'tls': True,
        }
    }
}

# ─── Password Validation ──────────────────────────────────────────────────────

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ─── Internationalisation ─────────────────────────────────────────────────────

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ─── Static Files (WhiteNoise) ────────────────────────────────────────────────

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ─── Default Auto Field ───────────────────────────────────────────────────────

DEFAULT_AUTO_FIELD = 'django_mongodb_backend.fields.ObjectIdAutoField'

# ─── CORS ─────────────────────────────────────────────────────────────────────

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # Add your Vercel URL below after deploying, e.g.:
    # "https://your-portfolio.vercel.app",
]

CORS_ALLOWED_ORIGINS += [
    origin for origin in os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',')
    if origin.strip()
]

# ─── MongoDB ──────────────────────────────────────────────────────────────────

SILENCED_SYSTEM_CHECKS = ['mongodb.E001']
