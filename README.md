# Ground Control VR
![Alt text] (/public/assets/Ground Control.png?raw=true "Ground Control")

A VR simulation about clear communication built in AFrame, React, Redux, Firebase, for the Google Daydream headset.

> NOTE: To play Ground Control one user must have access to a Google Daydream headset and controller.

## How to Play
To win:
- Space pilot must solve three panels to repair their ship.
- Ground Control has instructions under three tabs that explains the order that the pilot must toggle switches and press buttons.
- Panels must be solved in order: from panel one to panel three

After each solved panel, press the large green button at the front of the ship to check your solution. Incorrect submissions will trigger an alarm. Correct submissions will show the system back online. The pilot has three chances to solve the panels.

## Tips for Winning
- Don't talk too much. Wait for your partner to respond before sending another message.
- Make every word count.
- Stay calm.

## How to Run Ground Control
If you'd like to run Ground Control locally...

1. clone this repository
2. run `npm install` to get all dependencies
3. `npm start`

## Rooms
Ground Control uses a room system to pair participants. To enter the same room as your partner, go to your server at the same hashed address. For example:

```
localhost:3000/#2
                ^ room address

This will put you in room two. Your partner should go to the same address at /#2
```

Make sure only one person chooses Pilot and one person chooses Ground Control, or you will not be able to communicate.

## Contributors
- Julius Cassin
- Nate Anecone
- Wilson Wong
- Zach Caceres

Built at Fullstack Academy of Code in NYC
