# BullsOrCowsGameFront

### Requirements:

1. Run `npm install` to install the packages
2. Run `expo start` to start it via expo (for mobile)

`or`

2. Run `expo start --web` will execute the game in browser

### Game Rules:

1. Computer guesses the number
2. User inputs the number
3. Computer provides the amount of cows and oxes
    
    3.1. Cows - one of the digits in the input value, exists in the guessed value, but not in the correct position. Example originalValue => 4516, providedValue => 1809. Number 1 in the provided value is at position 1, whether in the original value it is positioned as 3. Therefore it is marked as "Cow"
    
    3.2. Oxes - one of the digits in the input value exists and stands in the correct position. Example  originalValue => 4516, providedValue => 3210, number 1 in this case marked as oxe.

