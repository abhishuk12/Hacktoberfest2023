#Rock, Paper, Scissors

import random

user = input("Choose between (rock, paper, scissors): ")
print("User chose", user)

options = ["rock", "paper", "scissors"]
computer = random.choice(options)
print("Computer chose", computer)

if user == computer:
  print("it's a tie ⚔️ You both chose", user)
elif user == "rock":
  if computer == "paper":
    print("🖥 Computer Wins! Paper defeats rock")
  else:
    print("👤 User Wins! Rock defeats scissors")
elif user == "paper":
    if computer == "rock":
        print("👤 User Wins! Paper defeats rock")
    else:
        print("🖥 Computer Wins! Scissors defeats paper")
elif user == "scissors":
    if computer == "rock":
        print("🖥 Computer Wins! Rock defeats Scissors")
    else:
        print("👤 User Wins! Scissors defeats paper")
