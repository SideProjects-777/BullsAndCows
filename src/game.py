
import random

def generateGame(n):
    fourDigits = random.randint(1000,9999)
    fiveDigits = random.randint(10000,99999)
    val = {
        4: fourDigits,
        5: fiveDigits,
    }
    return val.get(n, "nothing")

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


if __name__=='__main__':  
    print("Game has started")
    siz = int(input())
    hiddenValue = generateGame(siz)
    print("Number has been generated = ")
    print(hiddenValue)
    finished = False
    round = 1
    while finished==False:
        print("Round= ", round, "be ready!")
        quess = int(input("give your quess"))
        if quess == hiddenValue:
            print("Congratulations you got the value")
            finished = True
        else:
            oxen = genOxen(quess, hiddenValue)
            cows = genCows(quess, hiddenValue)
            print("We have ", oxen," oxen and ",cows," cows")
        round = round + 1
        

