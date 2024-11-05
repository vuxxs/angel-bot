import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { getImpetusOption, replyToImpetus } from "../utilities/Impetus";

export default {
  name: "rps",
  description: "Play a game of rock paper scissors with the bot",
  category: "fun",
  options: [
    {
      name: "choice",
      type: ApplicationCommandOptionType.String,
      description: "Your choice",
      required: true,
      choices: [
        { name: "rock", value: "rock" },
        { name: "paper", value: "paper" },
        { name: "scissors", value: "scissors" },
      ],
    },
  ],
  async execute(impetus, args = []) {
    const choices = ["rock", "paper", "scissors"];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    const userChoice = getImpetusOption(impetus, args, "choice");
    const exists = choices.find((value: string) => userChoice === value);

    if (
      !userChoice ||
      /* Don't check for exists if it's an interaction, exists is undefined */
      (!exists && !(impetus instanceof CommandInteraction))
    ) {
      replyToImpetus(
        impetus,
        "You didn't choose a value! Use either rock, paper or scissors."
      );
      return;
    }

    let result;
    if (botChoice == userChoice) {
      result = `**It's a draw!** Both of us chose ${botChoice}`;
    } else if (
      (botChoice === "rock" && userChoice === "scissors") ||
      (botChoice === "scissors" && userChoice === "paper") ||
      (botChoice === "paper" && userChoice === "rock")
    ) {
      result = `**I win!** I chose ${botChoice}`;
    } else {
      result = `**You win!** I chose ${botChoice}`;
    }

    replyToImpetus(impetus, result);
  },
} as Command;
