import { CommandInteraction, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";

export function pingCommand(): Command {
  return {
    name: "ping",
    description: "Ping command",
    execute: async (interaction?: CommandInteraction, message?: Message) => {
      // Command execution logic
      if (interaction && interaction.isCommand()) {
        await interaction.reply("Pong!");
      } else if (message) {
        message.channel.send("Pong!");
      }
    },
  };
}
