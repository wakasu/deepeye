# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('train/', views.train, name='objectdetection-train'),
    path('dataset/', views.dataset, name='objectdetection-dataset'),
]