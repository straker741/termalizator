import RPi.GPIO as GPIO
import subprocess
import json
from time import sleep
from datetime import datetime


BASE_DIR = "/sys/bus/w1/devices/"


def getConfig(path):
    try:
        with open(path, 'r') as f:    
            content = f.read()
    except:
        print("Error: Could not get config!")
        return ""
    return content

def setConfig(path, data):
    try:
        with open(path, 'w') as f:
            f.write(str(data))
    except:
        print("Error: Could not set config!")
        return False
    return True

def getWorkingDirectory():
    p = subprocess.Popen("pwd", stdout=subprocess.PIPE, universal_newlines=True, shell=True)
    data = p.communicate()[0].strip()
    return data


class ThermoReader:
    def __init__(self):
        try:
            wd = getWorkingDirectory()
            config = getConfig(wd + "/config.json")
            config = json.loads(config)
            self.inputPin = config["inputPin"]
            self.outputPin = config["outputPin"]
            self.targetTemp = config["targetTemp"]
            self.setup()
        except:
            print("Cannot read config.json!")
            print("Exitting!")
            exit()

    def setup():
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(outputPin, GPIO.OUT)
        GPIO.setup(inputPin, GPIO.IN)
        self.getIDs()

    def getIDs():
        p = subprocess.Popen("ls " + BASE_DIR, stdout=subprocess.PIPE, universal_newlines=True, shell=True)
        data = p.communicate()[0]
        self.IDs = [ x for x in data if x[0:2] == "28" ]
        return self.IDs

    def read_temp_raw(path):
        f = open(path, 'r')
        lines = f.readlines()
        f.close()
        return lines
    
    def read_temp(path):
        lines = self.read_temp_raw(path)
        while lines[0].strip()[-3:] != 'YES':
            time.sleep(0.2)
            lines = self.read_temp_raw(path)
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
            temp_string = lines[1][equals_pos+2:]
            temp_c = float(temp_string) / 1000.0       
            return temp_c

    def getTempsWithIDs():
        data = []
        for ID in self.IDs:
            path = BASE_DIR + ID + '/w1_slave'
            temp = self.read_temp(path)
            data.append([ID, temp])
        self.data = data
        return data

    def getAVG():
        values = [ x[1] for x in self.data ]
        avg = sum(values) / len(values)
        return avg

    def setOutON():
        GPIO.output(self.outputPin, GPIO.HIGH)
        print("Setting outputPin HIGH")

    def setOutOFF():
        GPIO.output(self.outputPin, GPIO.LOW)
        print("Setting outputPin LOW")

if __name__ == "__main__":
    try:
        TR = ThermoReader()
        TR.setup()

        while True:
            data = TR.getTempsWithIDs()
            temp = TR.getAVG()
            if temp < TR.targetTemp:
                TR.setOutON()
            else:
                TR.setOutOFF()

            print(data)
            print(json.dump(data))
            data = {
                "data": data,
                "datetime": datetime.now()
            }
            setConfig(wd + "/data.json", json.dump(data))

            sleep(1)
    except KeyboardInterrupt:
        print("End of temperature readings!")

