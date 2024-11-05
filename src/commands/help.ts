import { CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { CustomClient } from "../interfaces/client.interface";
import { replyToImpetus } from "../utilities/Impetus";

export default {
  name: "help",
  description: "Displays a list of all available commands",
  category: "utility",
  async execute(
    impetus,
    args = [] // Use it for command categories
  ) {
    // We retrieve all commands from the client
    const client = impetus.client as CustomClient;

    if (!client) return;
    const commands = client.commands;

    if (!commands) return;

    // We create an embed for a pretty display of commands
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Bot Commands")
      .setDescription("Here are the commands you can use with this bot:")
      .setFooter({
        text: `Use /<command> or ${client.options.prefix}<command> to execute a command`,
      });

    // We add a field for each command with its description
    commands.forEach((command: Command) => {
      embed.addFields({ name: command.name, value: command.description });
    });

    replyToImpetus(impetus, { embeds: [embed] });
  },
} as Command;
