import os
import sys
import random

def agent(value):
    # making choices
    game_choices = ["win","lose","draw"]
    agent_choice = random.choices(game_choices,weights=(30,60,10),k=3)
    agent_choice = agent_choice[0]
    choice = ""
    #win
    if agent_choice == "win":
        win_dict = {"rock":"paper","scissor":"rock","paper":"scissor"}
        choice = win_dict[value]
        print(choice)
        print("I got " + choice +" haha get smaked")
        command = "flite \" I got {0}. hahah got smaked\" -o test.wav && afplay test.wav".format(choice)
        os.system(command)
    # lose
    elif agent_choice == "lose":
        lose_dict = {"rock":"scissor","scissor":"paper","paper":"rock"}
        choice = lose_dict[value]
        print(choice)
        # speaking text
        print("I got " + choice +" Oh no you win.I will say anything")
        command = "flite \" I got {0}. Oh no you win.I will say anything.\" -o test.wav && afplay test.wav".format(choice)
        os.system(command)
        # type something for tts
        words = input("Type something:\n")
        if(words):
            command = "flite \" {0}\" -o test.wav && afplay test.wav".format(words)
            os.system(command)
    #draw
    else:
        choice = value
        print("I got " + choice +". Try again")
        command = "flite \" I got {0}.Try again\" -o test.wav && afplay test.wav".format(choice)
        os.system(command)

 # "sys.argv" returns an array with the arguments passed when Python interpreter was launched.

def main():
    print("\n**********Welcome to Rock Paper Scissor*********\n")
    print("Play rock paper scissor with me....\n")
    print("If you win, I will speak what ever you want me to say.\n")
    print("You can quit the game by type: quit\n")
    input_val =""
    while(True):
        input_val = input("\nrock,paper,scissor....\n")
        if(input_val!= "quit"):
            agent(input_val)
        else:
            command = "flite \"See you human.\" -o test.wav && afplay test.wav"
            os.system(command)
            break
        #say(sys.argv[1])

if __name__ == "__main__":
    main()
