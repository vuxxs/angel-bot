import { CommandInteraction, Message, EmbedBuilder } from "discord.js";
import { Command } from "../interfaces/command.interface";

export default {
  name: "serverinfo",
  description: "Displays information about the server",
  async execute(interaction?: CommandInteraction, message?: Message) {
    let guild;

    if (interaction) guild = interaction.guild;
    if (message) guild = message.guild;

    if (!guild) return;

    const embed = new EmbedBuilder()
      .setTitle(`${guild.name}'s Information`)
      .setColor("#0099ff")
      .addFields(
        { name: "Server Name", value: guild.name, inline: true },
        { name: "Server ID", value: guild.id, inline: true },
        {
          name: "Creation Date",
          value: guild.createdAt.toDateString(),
          inline: true,
        },
        {
          name: "Owner",
          value: `<@!${guild.ownerId}>` || "Unknown",
          inline: true,
        },
        {
          name: "Member Count",
          value: guild.memberCount.toString(),
          inline: true,
        },
        {
          name: "Roles Count",
          value: guild.roles.cache.size.toString(),
          inline: true,
        }
      )
      .setThumbnail(guild.iconURL() || null);

    if (interaction) await interaction.reply({ embeds: [embed] });
    if (message) await message.channel.send({ embeds: [embed] });
  },
} as Command;
