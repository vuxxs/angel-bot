import { CommandInteraction, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "ping",
  description: "Ping command",
  execute: async (interaction?: CommandInteraction, message?: Message) => {
    sendMessage(message, interaction, "Pong!");
  },
} as Command;
