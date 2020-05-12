from django import forms
from django.forms import ModelForm
from .models import Dataset


class FileUploader(ModelForm):
    class Meta:
        model = Dataset
        fields = ('dataset_name', 'memo', 'classes', 'val_pct', 'test_pct')
    
    # ## TODO Option to just select the directory & using ModelForm instead of forms
    file_field = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
