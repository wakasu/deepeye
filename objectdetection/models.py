from django.db import models
from django import forms


class Dataset(models.Model):
    dataset_name = models.CharField("Dataset Name:", default="Dataset1", max_length=255, unique=True)
    dataset_path = models.CharField("Dataset path:", default="Dataset1", max_length=255, unique=True)
    val_pct = models.IntegerField("Validation %", default=10)
    test_pct = models.IntegerField("Test %", default=10)
    memo = models.TextField("Memo", blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    classes = models.IntegerField("No. of Classes:", default=3)
    
"""     
class Dataset(models.Model):
    dataset_name = models.CharField("Dataset Name:", default="Dataset1", max_length=255)
    val_pct = models.IntegerField("Validation %", default=10)
    test_pct = models.IntegerField("Test %", default=10)
    classes = models.IntegerField("No. of Classes:", default=3)
    memo = models.TextField("Memo", blank=True)

    created_on = models.DateTimeField(auto_now_add=True)
    
    
    #### Probaly Seperate in future code ####
    
    ### Augmentation ###
    image_type = models.CharField("Image Type:", max_length=9, choices=([('color', 'Color'), 
                                    ('greyscale', 'Greyscale')]), default='color')
    
    
    ### Model ###
    architecture_type = models.CharField("Architecture Type:", max_length=11, choices=([('ssd', 'SSD'), 
                                        ('yolov3', 'YoloV3'), ('yolov3-tiny', 'YoloV3-Tiny')]), default='yolov3')
    epochs = models.IntegerField("No. of Epochs:", default=30)
    bath_size = models.IntegerField("Batch Size:", default=1)
    learning_rate = models.FloatField("Initial learning rate:", default=0.0001)
    optimizer = models.CharField("Optimizer:", max_length=11, choices=([('sgd', 'sgd'), ('rmsprop', 'rmsprop'), 
                                                                ('adagrad', 'adagrad'), ('adadelta', 'adadelta'), 
                                                                ('adam', 'adam'), ('adamax', 'adamax'), ('nadam', 'nadam')]), default='adam')
     """