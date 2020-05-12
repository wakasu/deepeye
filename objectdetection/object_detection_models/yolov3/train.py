import sys
import tensorflow as tf
import numpy as np
import cv2, json
from absl import app, flags, logging
from tensorflow.keras.callbacks import (
    ReduceLROnPlateau,
    EarlyStopping,
    ModelCheckpoint,
    TensorBoard
)
from .yolo_models import (
    YoloV3, YoloV3Tiny, YoloLoss, YoloAcc,
    yolo_anchors, yolo_anchor_masks,
    yolo_tiny_anchors, yolo_tiny_anchor_masks
)
from .utils import freeze_all
from . import dataset

def main(socket, train_dataset:str, val_dataset:str, optimizer_str:str, classes:str, weights, 
        tiny, mode, transfer, size:int, epochs:int, batch_size:int, 
        learning_rate:float, num_classes:int, weights_num_classes:int):

    physical_devices = tf.config.experimental.list_physical_devices('GPU')
    if len(physical_devices) > 0:
        tf.config.experimental.set_memory_growth(physical_devices[0], True)

    if tiny:
        model = YoloV3Tiny(size, training=True,
                           classes=num_classes)
        anchors = yolo_tiny_anchors
        anchor_masks = yolo_tiny_anchor_masks
    else:
        model = YoloV3(size, training=True, classes=num_classes)
        anchors = yolo_anchors
        anchor_masks = yolo_anchor_masks

    # Train Dataset
    train_dataset = dataset.load_tfrecord_dataset(
    train_dataset, classes, size)
    train_dataset = train_dataset.batch(batch_size)
    train_dataset = train_dataset.map(lambda x, y: (
        dataset.transform_images(x, size),
        dataset.transform_targets(y, anchors, anchor_masks, size)))

    # Validation Dataset
    val_dataset = dataset.load_tfrecord_dataset(
    val_dataset, classes, size)
    val_dataset = val_dataset.batch(batch_size)
    val_dataset = val_dataset.map(lambda x, y: (
        dataset.transform_images(x, size),
        dataset.transform_targets(y, anchors, anchor_masks, size)))
    

    # Configure the model for transfer learning
    if transfer == 'none':
        pass  # Nothing to do
    elif transfer in ['darknet', 'no_output']:
        # Darknet transfer is a special case that works
        # with incompatible number of classes

        # reset top layers
        if tiny:
            model_pretrained = YoloV3Tiny(
                size, training=True, classes=weights_num_classes or num_classes)
        else:
            model_pretrained = YoloV3(
                size, training=True, classes=weights_num_classes or num_classes)
        model_pretrained.load_weights(weights)

        if transfer == 'darknet':
            model.get_layer('yolo_darknet').set_weights(
                model_pretrained.get_layer('yolo_darknet').get_weights())
            freeze_all(model.get_layer('yolo_darknet'))

        elif transfer == 'no_output':
            for l in model.layers:
                if not l.name.startswith('yolo_output'):
                    l.set_weights(model_pretrained.get_layer(
                        l.name).get_weights())
                    freeze_all(l)

    else:
        # All other transfer require matching classes
        model.load_weights(weights)
        if transfer == 'fine_tune':
            # freeze darknet and fine tune other layers
            darknet = model.get_layer('yolo_darknet')
            freeze_all(darknet)
        elif transfer == 'frozen':
            # freeze everything
            freeze_all(model)

    ## Setting optimizer
    optimizer = None
    if optimizer_str == 'sgd':
        optimizer = tf.keras.optimizers.SGD(lr=learning_rate)
    elif optimizer_str == 'rmsprop':
        optimizer = tf.keras.optimizers.RMSprop(lr=learning_rate)
    elif optimizer_str == 'adagrad':
        optimizer = tf.keras.optimizers.Adagrad(lr=learning_rate)
    elif optimizer_str == 'adadelta':
        optimizer = tf.keras.optimizers.Adadelta(lr=learning_rate)
    elif optimizer_str == 'adam':
        optimizer = tf.keras.optimizers.Adam(lr=learning_rate)
    elif optimizer_str == 'adamax':
        optimizer = tf.keras.optimizers.Adamax(lr=learning_rate)
    elif optimizer_str == 'nadam':
        optimizer = tf.keras.optimizers.Nadam(lr=learning_rate)

    # Setting loss function
    loss = [YoloLoss(anchors[mask], classes=num_classes)
            for mask in anchor_masks]


    class CustomCallback(tf.keras.callbacks.Callback):
            
        def on_train_batch_end(self, batch, logs=None):
            socket.send(text_data=json.dumps({'batch':batch, 'loss': float("{:.3f}".format(logs.get('loss')/10000)), 
            'acc': float("{:.3f}".format(logs.get('yolo_output_0_accuracy')+logs.get('yolo_output_1_accuracy')
            +logs.get('yolo_output_2_accuracy')))}))
        def on_epoch_end(self, epoch, logs=None):
            print("epoch", logs, epoch)
            socket.send(text_data=json.dumps({'epoch':epoch+1, 'loss': float("{:.3f}".format(logs.get('loss')/10000)), 
            'acc': float("{:.3f}".format(logs.get('yolo_output_0_accuracy')+logs.get('yolo_output_1_accuracy')
            +logs.get('yolo_output_2_accuracy'))), 'val_loss': float("{:.3f}".format(logs.get('val_loss')/10000)), 
            'val_acc': float("{:.3f}".format(logs.get('val_yolo_output_0_accuracy')+logs.get('val_yolo_output_1_accuracy')
            +logs.get('val_yolo_output_2_accuracy')))}))
    
    model.compile(optimizer=optimizer, loss=loss,
                metrics=['accuracy'], 
                run_eagerly=True)

    callbacks = [
        ReduceLROnPlateau(verbose=0),
        EarlyStopping(patience=3, verbose=2),
        ModelCheckpoint('yolo_checkpoints/yolov3_train_{epoch}.tf',
                        verbose=2, save_weights_only=True),
        TensorBoard(log_dir='logs')
    ]

    history = model.fit(train_dataset,
                        verbose=1,
                        epochs=epochs,
                        callbacks=[[CustomCallback()], callbacks],
                        validation_data=val_dataset)

if __name__ == '__main__':
    try:
        app.run(main)
    except SystemExit:
        pass
    # for Debugging through command line
    # self.main(*sys.argv[1:])