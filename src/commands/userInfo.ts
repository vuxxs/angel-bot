import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { filterUserId } from "../utilities/filterUserId";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "userinfo",
  description: "Displays information about a user",
  options: [
    {
      name: "target",
      description: "Select a user",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  async execute(
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) {
    if (!args) args = [];
    const user =
      interaction?.options.getUser("target") ||
      interaction?.user ||
      message?.guild?.members.cache.get(filterUserId(args[0]))?.user ||
      message?.author;
    if (!user) return;
    const member =
      interaction?.guild?.members.cache.get(user.id)! ||
      message?.guild?.members.cache.get(user.id);

    if (!member) return;

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Information`)
      .setColor("#0099ff")
      .addFields(
        { name: "Username", value: user.username, inline: true },
        { name: "User ID", value: user.id, inline: true },
        {
          name: "Joined Discord",
          value: user.createdAt.toDateString(),
          inline: true,
        },
        {
          name: "Joined Server",
          value: member!.joinedAt!.toDateString(),
          inline: true,
        },
        {
          name: "Roles",
          value: member!.roles.cache.map((role) => role.name).join(", "),
          inline: true,
        }
      )
      .setThumbnail(user.avatarURL() || null);

    sendMessage(message, interaction, { embeds: [embed] });
  },
} as Command;
