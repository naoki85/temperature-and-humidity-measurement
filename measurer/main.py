import sys
import os
from os.path import join, dirname
import datetime
import Adafruit_DHT
import boto3
from dotenv import load_dotenv

load_dotenv(verbose=True)
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

PIN = os.environ.get('PIN')
DYNAMODB_TABLE_NAME = os.environ.get('DYNAMODB_TABLE_NAME')


def main():
    now = datetime.datetime.now()

    sensor = Adafruit_DHT.AM2302
    pin = int(PIN)
    humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

    if humidity is None or temperature is None:
        file = open('/home/pi/log_AM2302/error_log.txt', 'a+')
        file.write('{0:%Y/%m/%d %H:%M:%S},error\n'.format(now))
        sys.exit(1)

    put_item_in_dynamodb(now, temperature, humidity)
    return


def put_item_in_dynamodb(now, temperature, humidity):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)

    timestamp = int((now + datetime.timedelta(days=7)).timestamp())
    created = '{0:%Y/%m/%d %H:%M:%S}'.format(now)
    temperature = '{0:0.1f}'.format(temperature)
    humidity = '{0:0.1f}'.format(humidity)

    res = table.put_item(
        Item={
            "timestamp": timestamp,
            "created": created,
            "temperature": temperature,
            "humidity": humidity
        }
    )

    if res['ResponseMetadata']['HTTPStatusCode'] != 200:
        file = open('/home/pi/log_AM2302/error_log.txt', 'a+')
        file.write('{}\n'.format(res))
        sys.exit(1)
    return


if __name__ == '__main__':
    main()