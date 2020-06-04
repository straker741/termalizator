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

def getTargetTemp():
    config = getConfig(wd + "/config.json")
    config = json.loads(config)
    return config["targetTemp"]

class ThermoReader:
    def __init__(self, wd):
        try:
            print("working Directory:", wd)
            config = getConfig(wd + "/config.json")
            print("config:", config)
            config = json.loads(config)
            self.inputPin = config["inputPin"]
            self.outputPin = config["outputPin"]
            self.targetTemp = config["targetTemp"]
            
            self.setup()
        except:
            print("Cannot read config.json!")
            print("Exitting!")
            exit()

    def setup(self):
        print("SETUP")
        GPIO.setmode(GPIO.BOARD)
        print("Setting mode")
        GPIO.setup(self.outputPin, GPIO.OUT, initial=GPIO.LOW)
        GPIO.setup(self.inputPin, GPIO.IN)
        print("Setting GPIOs")
        print("Getting IDs:", end=" ")
        self.getIDs()

    def getIDs(self):
        p = subprocess.Popen("ls " + BASE_DIR, stdout=subprocess.PIPE, universal_newlines=True, shell=True)
        data = p.communicate()[0].split()
        self.IDs = [ x for x in data if x[0:2] == "28" ]
        print(self.IDs)
        return self.IDs

    def read_temp_raw(self, path):
        f = open(path, 'r')
        lines = f.readlines()
        f.close()
        return lines
    
    def read_temp(self, path):
        lines = self.read_temp_raw(path)
        while lines[0].strip()[-3:] != 'YES':
            time.sleep(0.2)
            lines = self.read_temp_raw(path)
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
            temp_string = lines[1][equals_pos+2:]
            temp_c = float(temp_string) / 1000.0       
            return temp_c

    def getTempsWithIDs(self):
        data = []
        for ID in self.IDs:
            path = BASE_DIR + ID + '/w1_slave'
            temp = self.read_temp(path)
            data.append([ID, temp])
        self.data = data
        return data

    def getAVG(self):
        values = [ x[1] for x in self.data ]
        avg = sum(values) / len(values)
        return avg

    def setOutON(self):
        GPIO.output(self.outputPin, GPIO.HIGH)
        print("Setting outputPin HIGH", end=" ")
        print(GPIO.gpio_function(self.outputPin))

    def setOutOFF(self):
        GPIO.output(self.outputPin, GPIO.LOW)
        print("Setting outputPin LOW:", end=" ")
        print(GPIO.gpio_function(self.outputPin))

if __name__ == "__main__":
    try:
        wd = getWorkingDirectory()
        TR = ThermoReader(wd)
        TR.setup()

        while True:
            data = TR.getTempsWithIDs()
            temp = TR.getAVG()
            targetTemp = getTargetTemp()
            if temp < targetTemp:
                TR.setOutON()
            else:
                TR.setOutOFF()

            
            print("json dumps:", json.dumps(data))
            data = {
                "data": data,
                "datetime": datetime.now().strftime("%Y-%m-%d %H-%M-%S")
            }
            print("data:", data)
            setConfig(wd + "/data.json", json.dumps(data))

            sleep(1)
    except KeyboardInterrupt:
        print("End of temperature readings!")
        GPIO.cleanup()

