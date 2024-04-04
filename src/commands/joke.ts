import { CommandInteraction, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage } from "../utilities/sendMessage";

// TODO Pull from a database or add your own local file logic
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the chicken go to the séance? To talk to the other side.",
  "Why don't some animals play cards? Because they're afraid of cheetahs.",
  "What do you call cheese that isn't yours? Nacho cheese!",
  "Why couldn't the bicycle stand up by itself? It was two tired!",
];

export default {
  name: "joke",
  description: "Tells a random joke",
  category: "fun",
  async execute(interaction?: CommandInteraction, message?: Message) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    sendMessage(message, interaction, joke);
  },
} as Command;
