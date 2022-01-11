import random

def generateGame(n):
    fourDigits = random.randint(1000,9999)
    fiveDigits = random.randint(10000,99999)
    val = {
        4: fourDigits,
        5: fiveDigits,
    }
    return val.get(n)

def genOxen(quess, value):
    strQuess = str(quess)
    strValue = str(value)
    oxen = 0
    for element in range(0, len(strQuess)):
        if strQuess[element] == strValue[element]:
            oxen = oxen + 1
    return oxen

def genCows(quess, value):
    strQuess = str(quess)
    strValue = str(value)
    cows = 0
    for loop1 in range(0, len(strQuess)):
        for loop2 in range(0, len(strValue)):
            if loop1==loop2:
                continue
            else:
                if strValue[loop2] == strQuess[loop1]:
                    cows = cows + 1
    return cows