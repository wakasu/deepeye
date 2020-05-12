FROM tensorflow/tensorflow:2.2.0rc2-gpu-py3-jupyter
ENV PYTHONUNBUFFERED 1
WORKDIR /code

RUN apt-get update -y
RUN apt-get install -y libsm6 libxext6 libxrender-dev redis-server cifs-utils
COPY requirements.txt /code/
RUN pip install -r requirements.txt
