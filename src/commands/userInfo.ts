import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Command } from "../interfaces/command.interface";
import {
  getImpetusTarget,
  getImpetusUser,
  replyToImpetus,
} from "../utilities/Impetus";

export default {
  name: "userinfo",
  description: "Displays information about a user",
  category: "utility",
  options: [
    {
      name: "target",
      description: "Select a user",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  async execute(impetus, args = []) {
    if (!impetus.guild) return;
    const user = getImpetusTarget(impetus, args) || getImpetusUser(impetus);

    if (!user) return;

    const member = impetus.guild.members.cache.get(user.id);

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

    replyToImpetus(impetus, { embeds: [embed] });
  },
} as Command;
