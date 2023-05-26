import { CommandInteraction, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "dice",
  description: "Roll a virtual dice",
  async execute(interaction?: CommandInteraction, message?: Message) {
    const result = Math.floor(Math.random() * 6) + 1;
    sendMessage(message, interaction, `You rolled ${result}.`);
  },
} as Command;
