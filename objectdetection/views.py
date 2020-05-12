from django.shortcuts import render, redirect
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .forms import FileUploader
from django.conf import settings
import os
from DeepEye.settings import MEDIA_ROOT
from DeepEye.settings import TEMPLATE_DIRS
from tqdm import tqdm
from .object_detection_models import kitti_to_tfRecords
from .models import Dataset


def train(request):
    return render(request, 'objectdetection/train.html')


def dataset(request):
    if request.method == 'POST':
        form = FileUploader(request.POST, request.FILES)
        files = request.FILES.getlist("file_field")
        print("outside form")

        if form.is_valid():
            print("Form validated")
            # Saving the uploaded files to the dataset folder
            # TODO making sure the required files are provided
            # for f in tqdm(files):
            #     print("Form validated")
            #     default_storage.save(os.path.join(form.cleaned_data['dataset_name'], 'temp' , str(f)), ContentFile(f.read()))  

            dataset_path = os.path.join(MEDIA_ROOT, form.cleaned_data['dataset_name'])
            dataset_name = form.cleaned_data['dataset_name']
            num_classes = form.cleaned_data['classes']
            val_pct = form.cleaned_data['val_pct']
            test_pct = form.cleaned_data['test_pct']
            memo = form.cleaned_data['memo']

            p = Dataset(dataset_path=dataset_path, dataset_name=dataset_name, classes=num_classes, 
                memo=memo, val_pct=val_pct, test_pct=test_pct)
            p.save()

            kitti_to_tfRecords.main(dataset_path, num_classes, val_pct, test_pct)

            return render(request, 'objectdetection/train.html')
    else:
        form = FileUploader()
    return render(request, 'objectdetection/dataset.html', {
        'form': form
    })
""" 

    def dataset(request):
    if request.method == 'POST':
        form = FileUploader(request.POST, request.FILES)
        files = request.FILES.getlist("source_path")
        output = ""
        if form.is_valid():

            # Saving the uploaded files to the dataset folder
            # TODO making sure the required files are provided
            for f in tqdm(files):
                 default_storage.save(os.path.join(form.cleaned_data['dataset_name'], str(f)), ContentFile(f.read()))       
            
            # Calling to KittytotfRecords script for 
            # 1. Spllitiing data into validation and test datasets 
            # 2. Conversion from kitti format annotated data tfRecords
            # TODO 3. Performing Data Augmentation 
    
            data_path = os.path.join(MEDIA_ROOT, form.cleaned_data['dataset_name'])
            image_type = form.cleaned_data['image_type']
            val = form.cleaned_data['val_pct']
            test = form.cleaned_data['test_pct']
            num_classes = form.cleaned_data['classes']
            kitti_to_tfRecords.main(data_path, num_classes, image_type, val, test)

            # train_dataset = os.path.join(data_path, 'train.tfrecord')
            # val_dataset = os.path.join(data_path, 'val.tfrecord')
            # test_dataset = os.path.join(data_path, 'test.tfrecord')


            return render(request, 'objectdetection/dataset.html', {
                'form': form})
    else:
        form = FileUploader()
    return render(request, 'objectdetection/dataset.html', {
        'form': form
    })
 """