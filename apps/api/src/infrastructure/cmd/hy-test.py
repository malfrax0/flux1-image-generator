import time
import sys

def printFlush(text):
    print(text)
    sys.stdout.flush()

while True:
    printFlush("&INPUT") 
    dataPrompt = input()
    dataPrompt = dataPrompt.replace("\n", '')
    data = dataPrompt.split("|")
    width = int(data[0])
    height = int(data[1])
    prompt = data[2]
    printFlush("&START")
    time.sleep(1)
    printFlush("&STEP,0,0")
    time.sleep(5)
    printFlush("&STEP,1,1000")
    time.sleep(5)
    printFlush("&STEP,2,1200")
    time.sleep(5)
    printFlush("&STEP,3,1400")
    time.sleep(5)
    printFlush(f"&END,{prompt},{width},{height}")