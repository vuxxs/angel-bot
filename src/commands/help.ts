import { CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { CustomClient } from "../interfaces/client.interface";

export default {
  name: "help",
  description: "Displays a list of all available commands",
  async execute(
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[] // Use it in the future for command categories
  ) {
    // Retrieve all commands from the client
    let client: CustomClient;
    if (interaction) {
      client = interaction?.client as CustomClient;
    } else {
      client = message?.client as CustomClient;
    }
    const commands = client.commands;

    if (!commands) return;

    // Create an embed for a pretty display of commands
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Bot Commands")
      .setDescription("Here are the commands you can use with this bot:")
      .setFooter({
        text: `Use /<command> or ${client.options.prefix}<command> to execute a command`,
      });

    // Add a field for each command with its description
    commands.forEach((command: Command) => {
      embed.addFields({ name: command.name, value: command.description });
    });

    // Reply with the embed
    if (interaction) {
      await interaction.reply({ embeds: [embed] });
    } else if (message) {
      await message.channel.send({ embeds: [embed] });
    }
  },
} as Command;
