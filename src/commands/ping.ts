import { CommandInteraction, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";

export default {
  name: "ping",
  description: "Ping command",
  execute: async (interaction?: CommandInteraction, message?: Message) => {
    if (interaction && interaction.isCommand()) {
      await interaction.reply("Pong!");
    } else if (message) {
      message.channel.send("Pong!");
    }
  },
} as Command;
