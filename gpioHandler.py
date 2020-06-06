import RPi.GPIO as GPIO
import subprocess
import os
import sys
import json
from time import sleep
from datetime import datetime


BASE_DIR = "/sys/bus/w1/devices/"


def readFile(path):
    try:
        with open(path, 'r') as f:    
            content = f.read()
        return content
    except:
        print("Error: Could not read from file!")
        exit()

def getConfig(path):
    try:
        content = readFile(path)
        return json.loads(content)
    except:
        print("Error: Could not load config.json")
        exit()

def setConfig(path, data):
    try:
        with open(path, 'w') as f:
            f.write(str(data))
        return True
    except:
        print("Error: Could not set config!")
        exit()

def get_script_path():
    return os.path.dirname(os.path.realpath(sys.argv[0]))

def getTargetTemp(wd):
    config = getConfig(wd + "/config.json")
    return config["targetTemp"]


class ThermoReader:
    def __init__(self, outPin):
        try:
            self.outputPin = outPin
            self.__setup()
            self.getIDs()
        except:
            print("Error: Could not initialize TermoReader!")
            exit()

    def __setup(self):
        try:
            GPIO.setmode(GPIO.BOARD)
            GPIO.setup(self.outputPin, GPIO.OUT, initial=GPIO.LOW)
        except:
            print("Error: Could not setup GPIO!")
            exit()

    def getIDs(self):
        p = subprocess.Popen("ls " + BASE_DIR, stdout=subprocess.PIPE, universal_newlines=True, shell=True)
        data = p.communicate()[0].split()
        self.IDs = [ x for x in data if x[0:2] == "28" ]
        return self.IDs

    def prettyPrint(self):
        try:
            i = 0
            for row in self.data:
                print(str(i) + ": id:", row[0], "temp:", row[1])
                i += 1
        except:
            print("Error: Unable to pretty print data!")
            exit()

    def __read_temp_raw(self, path):
        f = open(path, 'r')
        lines = f.readlines()
        f.close()
        return lines
    
    def __read_temp(self, path):
        lines = self.__read_temp_raw(path)
        while lines[0].strip()[-3:] != 'YES':
            time.sleep(0.2)
            lines = self.__read_temp_raw(path)
        equals_pos = lines[1].find('t=')
        if equals_pos != -1:
            temp_string = lines[1][equals_pos+2:]
            temp_c = float(temp_string) / 1000.0       
            return temp_c

    def getTempsWithIDs(self):
        data = []
        for ID in self.IDs:
            path = BASE_DIR + ID + '/w1_slave'
            temp = self.__read_temp(path)
            data.append([ID, temp])
        self.data = data
        return data

    def getAVG(self):
        try:
            values = [ x[1] for x in self.data ]
            avg = sum(values) / len(values)
            return avg
        except:
            print("Error: Unable to calculate average value of temperature!")
            print("Presumably because 'values' is empty!")
            exit()

    def setOutON(self):
        GPIO.output(self.outputPin, GPIO.HIGH)
        print("Setting outputPin to HIGH")

    def setOutOFF(self):
        GPIO.output(self.outputPin, GPIO.LOW)
        print("Setting outputPin to LOW!")

if __name__ == "__main__":
    try:
        wd = get_script_path()
        config = getConfig(wd + "/config.json")
        TR = ThermoReader(config["outputPin"])

        isLow = True
        while True:
            data = TR.getTempsWithIDs()
            temp = TR.getAVG()
            targetTemp = getTargetTemp(wd)
            if (temp < targetTemp and isLow):
                TR.setOutON()
                isLow = False
            elif (temp > targetTemp and not isLow):
                TR.setOutOFF()
                isLow = True
            currTime = datetime.now().strftime("%Y-%m-%d %H-%M-%S")

            # Logging
            print("Current time:", currTime)
            TR.prettyPrint()
            print("Average temp:", temp)
            print()

            # Preparing data
            data = {
                "data": data,
                "datetime": currTime
            }
            setConfig(wd + "/data.json", json.dumps(data))

            sleep(1)
    except KeyboardInterrupt:
        print("End of temperature readings!")
    except:
        print("Error OR process has been killed from outside")
GPIO.cleanup()
