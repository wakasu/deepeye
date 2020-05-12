import os
import glob
#import util as u
from argparse import ArgumentParser
import keras_ssd_train
import keras_ssd_predict

class Params():
    def __init__(self):
        args = self.parser()

        self.is_train = args.train
        size = str(args.size).split(',')
        self.size = [int(size[0]),int(size[1])]
        self.classes = args.classes
        self.channel = args.ch
        self.data_root_dir = args.data_root_dir
        self.epoch = args.epoch
        self.snap_shot = args.snap_shot
        self.save_best_only = args.save_best_only
        self.batch_size = args.batch_size
        self.base_lr = args.base_lr
        self.optimizer = args.optimizer
        self.weights = args.weights
        self.result_dir = args.result_dir
        self.threshold = args.threshold
        self.data_augmentation = args.data_augmentation
        
    def parser(self):
        argparser = ArgumentParser()

        argparser.add_argument('--train',type=int,default=-1)
        argparser.add_argument('--size',type=str,default="512,512")
        argparser.add_argument('--classes',type=int,default=3)
        argparser.add_argument('--ch',type=int,default=3)
        argparser.add_argument('--data_root_dir',type=str,default='/home')
        argparser.add_argument('--epoch',type=int,default=100)
        argparser.add_argument('--snap_shot',type=int,default=1)
        argparser.add_argument('--save_best_only',type=str,default='False')
        argparser.add_argument('--batch_size',type=int,default=1)
        argparser.add_argument('--base_lr',type=float,default=0.001)
        argparser.add_argument('--optimizer',type=str,default='sgd')
        argparser.add_argument('--weights',type=str)
        argparser.add_argument('--result_dir',type=str,default='/home/results')
        argparser.add_argument('--threshold', type=int, default=0.5)
        argparser.add_argument('--data_augmentation', type=int, default=0)
        args = argparser.parse_args()
        args.save_best_only = (args.save_best_only.lower() == 'true')
        return args

if __name__ == '__main__':
    p = Params()

    if p.is_train == 1:
        keras_ssd_train.Train(p)
        
    elif p.is_train == 0:
        print('test !')
        keras_ssd_predict.Predict(p)


#--train 1 --classes 2 --data_root_dir 'C:\Users\jwmnwq\Desktop\test\DATASET\Dataset1' --result_dir 'C:\Users\jwmnwq\Desktop\test\DATASET\Dataset1'