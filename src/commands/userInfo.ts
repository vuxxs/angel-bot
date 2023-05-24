import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { filterUserId } from "../utilities/filterUserId";

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
    let member;
    let user;
    if (interaction) {
      user = interaction.options.getUser("target") || interaction.user; // Get the target user, default to command user
      member = interaction.guild?.members.cache.get(user.id)!;
    } else if (message) {
      user = message!.author;
      if (args && args.length > 0)
        user = message.guild?.members.cache.get(filterUserId(args[0]))?.user;
      if (!user) return;
      member = message.guild?.members.cache.get(user.id);
    } else {
      return;
    }

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

    if (interaction) await interaction.reply({ embeds: [embed] });
    if (message) await message.channel.send({ embeds: [embed] });
  },
} as Command;
