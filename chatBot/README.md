# Not a Perfect Chat Bot 

I had experience with text to speech before using p5 and Arduino. P5 has a great library called p5 speech which can recognize speech and translate text into speech. This library is perfect to build a chat bot. 

[p5 code](https://editor.p5js.org/yzhang33/sketches/8wLeFk0Jv)

## Build the Bot

I wish my robot can exchange words with humans as much as possible. And it can not only reads text but also transfer text into speech. This can be done using regular expressions. There are 6 different states for this bot.

* Online State

   When never user speak anything with "online", robot will reply hello. 
* What can you do? State

   The user will ask the bot's ability to do something with the "can...do" phrase. The bot will change into a new voice and ask the user if he likes it. Users can reply back with a "no" to tell the robot to continue changing voice.
* Stupid State

   If the user gets mad at the bot, he/she can speak something with "stupid/dumb/useless", the bot will reply back.
* Bug State

   We all know computers can't calculate the square root of -1. If the user says the square root of -1, the robot will bug.
* Something Else

   If the user speaks something else rather than the above phrases, the bot will ask the user to say something he can understand. 
* Stop State
   
   User can stop the bot by saying "stop".

Here is the interface. The conversation will appear as text below and whenever the robot speaks the ring will become yellow to indicate that the robot is speaking.

![interface](assets/as1.png)

## Further Wokrs

I wish my bot can have a smoother conversation with a human rahter than some finite states. TensorFlow has many libraries which I can explore. I will research more on how to build a chat bot. 