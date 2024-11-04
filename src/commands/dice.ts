import { Command } from "../interfaces/command.interface";
import { replyToImpetus } from "../utilities/Impetus";

export default {
  name: "dice",
  description: "Roll a virtual dice",
  category: "fun",
  async execute(impetus) {
    const result = Math.floor(Math.random() * 6) + 1;
    replyToImpetus(impetus, `You rolled ${result}.`);
  },
} as Command;
