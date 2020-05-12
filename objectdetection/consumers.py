import json
from channels.generic.websocket import WebsocketConsumer
import os, sys
from .object_detection_models.yolov3 import train

class ObjectDetection(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        dataset_name = text_data_json['dataset_name'].lower()
        image_type = text_data_json['image_type'].lower()
        val_pct = text_data_json['val_pct']
        test_pct = text_data_json['test_pct']
        memo = text_data_json['memo']
        architecture = text_data_json['architecture'].lower()
        epoch = text_data_json['epoch']
        batch = text_data_json['batch']
        #num_classes = text_data_json['num_classes']
        learning_rate = text_data_json['learning_rate']
        optimizer = text_data_json['optimizer'].lower()
        print(dataset_name, image_type, val_pct, test_pct,
        memo, architecture, epoch, batch,
        learning_rate, optimizer)
        
        ### For Test Only###
        #self.send(text_data=json.dumps({'epoch': epoch, 'batch': batch}))
        train_dataset = "/code/deepeye/datasets/oden/train.tfrecord"
        val_dataset = "/code/deepeye/datasets/oden/val.tfrecord"
        tiny = False
        classes = '/code/deepeye/datasets/oden/class_list.txt'
        weights = '/code/deepeye/checkpoints/yolov3.tf'
        mode = 'fit'
        transfer = 'none'
        size = 416
        epochs = 8
        batch_size = 1
        learning_rate = 0.001
        num_classes = 5
        weights_num_classes = 80


        print("yehhh!!!! Made this far")
    
        train.main(self, train_dataset, val_dataset, optimizer, classes, weights, tiny, mode,
               transfer, size, epochs, batch_size, learning_rate, num_classes, 
               weights_num_classes)
