import json

def readFile(path):
    try:
        with open(path) as f:    
            content = f.read()
    except:
        print("Error: Could not read from file.")
        return ""
    return content

content = readFile("C:/Users/Jakub/Desktop/SKOLA/0_TOMAS/termalizator/config.json")
#print(content)
a = json.loads(content)

print(a["inputPin"])
