import sys, os, glob, random, cv2, hashlib
import tensorflow as tf
from tqdm import tqdm
import shutil
""" 
This script is used to 
1. Split the data into train, validation and test datasets
2. convert kitti format annotated data to tfRecords
"""

def main(data_path, classes, val_pct, test_pct):
    # Train, Validation, and Test data split

    class_map = {name: idx for idx, name in enumerate(
        [line.strip() for line in open(os.path.join(data_path, 'temp', 'class_list.txt'), 'r')])}
    shutil.copyfile(os.path.join(data_path, 'temp', 'class_list.txt'), os.path.join(data_path, 'class_list.txt'))
    print("Class mapping loaded: %s", class_map)

    val = float(val_pct)/100
    test = float(test_pct)/100
    train = 1.0 - (val + test)

    # print(train, val, test)
    
    image_list = glob.glob(os.path.join(data_path, 'temp', '*jpg'), recursive=True)
    image_list.extend(glob.glob(os.path.join(data_path,'temp', '*jpeg'), recursive=True))
    image_list.extend(glob.glob(os.path.join(data_path, 'temp', '*png'), recursive=True))
    annotation_list = glob.glob(os.path.join(data_path, 'temp', '*.txt'), recursive=True)
    
    file_list = []
    # if both annotation file and image file exits add to filel_list
    for img in image_list:
        base = os.path.basename(img)
        name, ext = os.path.splitext(base)
        img_path = img.rstrip('\r\n')
        img_path = img_path.rstrip('\n')
        img_path = img_path.rstrip('\r')
        label_path = os.path.join(data_path, 'temp', name + '.txt')
        if os.path.isfile(img_path):
            if os.path.isfile(label_path):
                elm = [img_path, label_path]
                file_list.append(elm)
    
    # Randomizing the file list and splitting it in to train, val, and training sets
    random.shuffle(file_list)
    num_val = int(len(file_list) * val)
    num_test = int(len(file_list) * test)
    train = file_list[num_test+1:]
    val = file_list[num_test:num_val+num_test+1]
    test = file_list[:num_test+1]   

    # print(len(train), len(val), len(test))

    def build_example(annotation, image, class_map):
        img_raw = open(image, 'rb').read()
        key = hashlib.sha256(img_raw).hexdigest()
        img = cv2.imread(image)
        height = img.shape[0]
        width = img.shape[1]
        name = os.path.basename(image)
        name, _ = os.path.splitext(name)
        
        xmin = []
        ymin = []
        xmax = []
        ymax = []
        classes = []
        classes_text = []

        for x in range(len(annotation)):
            xmin.append(float(annotation[x][4]) / width)
            ymin.append(float(annotation[x][5]) / height)
            xmax.append(float(annotation[x][6]) / width)
            ymax.append(float(annotation[x][7]) / height)
            classes_text.append((annotation[x][0]).encode('utf8'))
            classes.append(class_map[annotation[x][0]])

        example = tf.train.Example(features=tf.train.Features(feature={
            'image/height': tf.train.Feature(int64_list=tf.train.Int64List(value=[height])),
            'image/width': tf.train.Feature(int64_list=tf.train.Int64List(value=[width])),
            'image/filename': tf.train.Feature(bytes_list=tf.train.BytesList(value=[
                name.encode('utf8')])),
            'image/source_id': tf.train.Feature(bytes_list=tf.train.BytesList(value=[
                name.encode('utf8')])),
            'image/key/sha256': tf.train.Feature(bytes_list=tf.train.BytesList(value=[key.encode('utf8')])),
            'image/encoded': tf.train.Feature(bytes_list=tf.train.BytesList(value=[img_raw])),
            'image/format': tf.train.Feature(bytes_list=tf.train.BytesList(value=['jpeg'.encode('utf8')])),
            'image/object/bbox/xmin': tf.train.Feature(float_list=tf.train.FloatList(value=xmin)),
            'image/object/bbox/xmax': tf.train.Feature(float_list=tf.train.FloatList(value=xmax)),
            'image/object/bbox/ymin': tf.train.Feature(float_list=tf.train.FloatList(value=ymin)),
            'image/object/bbox/ymax': tf.train.Feature(float_list=tf.train.FloatList(value=ymax)),
            'image/object/class/text': tf.train.Feature(bytes_list=tf.train.BytesList(value=classes_text)),
            'image/object/class/label': tf.train.Feature(int64_list=tf.train.Int64List(value=classes)),
        }))
        return example
    writer = tf.io.TFRecordWriter(os.path.join(data_path, 'train.tfrecord'))
    for fi in tqdm(train):
        annotation = [line.strip().split(" ") for line in open(fi[1], 'r')]
        tf_example = build_example(annotation, fi[0], class_map)
        writer.write(tf_example.SerializeToString())
    writer.close()

    writer = tf.io.TFRecordWriter(os.path.join(data_path, 'val.tfrecord'))
    for fi in tqdm(val):
        annotation = [line.strip().split(" ") for line in open(fi[1], 'r')]
        tf_example = build_example(annotation, fi[0], class_map)
        writer.write(tf_example.SerializeToString())
    writer.close()

    writer = tf.io.TFRecordWriter(os.path.join(data_path, 'test.tfrecord'))
    for fi in tqdm(test):
        annotation = [line.strip().split(" ") for line in open(fi[1], 'r')]
        tf_example = build_example(annotation, fi[0], class_map)
        writer.write(tf_example.SerializeToString())
    writer.close()
    print("Finished creating tfRecord of dataset")

    shutil.rmtree(os.path.join(data_path, 'temp'), ignore_errors=True)
    print("Removed temp files")

if __name__ == '__main__':

    self.main()