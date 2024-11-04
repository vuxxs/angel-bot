import { Command } from "../interfaces/command.interface";
import { replyToImpetus } from "../utilities/Impetus";

// TODO Pull from database
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
  async execute(impetus) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    replyToImpetus(impetus, joke);
  },
} as Command;
