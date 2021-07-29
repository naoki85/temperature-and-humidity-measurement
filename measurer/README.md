# Measurer

## Install a library for the sensor

Assume the sensor AM2302.  

```
$ git clone https://github.com/adafruit/Adafruit_Python_DHT.git
$ cd Adafruit_Python_DHT 
$ python3 setup.py install
```

## Install other libraries

```
$ pip3 install -r requirements.txt
```

## Create an env file

```
$ cp .env.template .env
```
Then set each values.

## Run the script

```
$ python3 main.py
```