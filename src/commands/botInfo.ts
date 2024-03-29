import { CommandInteraction, EmbedBuilder, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import os from "os";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "botinfo",
  description: "Displays information about the bot",
  category: "utility",
  async execute(interaction?: CommandInteraction, message?: Message) {
    const client = interaction?.client || message?.client;

    if (!client) return;

    const uptime = Math.floor(process.uptime());

    const embed = new EmbedBuilder()
      .setTitle(`${client.user?.username}'s Information`)
      .setColor("#0099ff")
      .addFields(
        { name: "Uptime", value: `${uptime} seconds`, inline: true },
        {
          name: "Servers",
          value: `${client.guilds.cache.size} servers`,
          inline: true,
        },
        {
          name: "RAM Usage",
          value: `${
            Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) /
            100
          } MB`,
          inline: true,
        },
        { name: "OS", value: `${os.type()} ${os.release()}`, inline: true },
        { name: "Library", value: "discord.js", inline: true }
      )
      .setThumbnail(client.user?.avatarURL() || null);

    sendMessage(message, interaction, { embeds: [embed] });
  },
} as Command;
