import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { LogLevel, angelogger } from "../utilities/logger";
import { filterUserId } from "../utilities/filterUserId";

export default {
  name: "kick",
  description: "Kick a member from the server",
  permissions: ["KickMembers"],
  options: [
    {
      name: "target",
      type: ApplicationCommandOptionType.User,
      description: "Select a user to kick",
      required: true,
    },
    {
      name: "reason",
      type: ApplicationCommandOptionType.String,
      description: "Reason for kicking the user",
      required: false,
    },
  ],
  async execute(
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) {
    if (interaction) {
      if (!(interaction.member instanceof GuildMember)) return; // Interaction is in DM, return
      if (!interaction.member?.permissions.has("KickMembers")) {
        interaction.reply(
          "You do not have the necessary permissions to use this command."
        );
        return;
      }
      const targetUser = interaction.options.getUser("target");
      const reason =
        (interaction.options.get("reason")?.value as string) ||
        "No reason provided";

      if (!targetUser) return;

      const member = interaction.guild?.members.cache.get(targetUser.id);

      if (!member) {
        await interaction.reply("User not found");
        return;
      }

      try {
        await member.kick(reason);
        await interaction.reply(
          `${targetUser.tag} has been kicked for reason: ${reason}`
        );
      } catch (error) {
        await interaction.reply(
          "Can't kick this member, they might have a role higher than mine"
        );
      }
    } else if (message) {
      if (!(message.member instanceof GuildMember)) return; // Interaction is in DM, return
      const channel = message.channel;
      if (!message.member.permissions.has("KickMembers")) {
        channel.send(
          "You do not have the necessary permissions to use this command."
        );
        return;
      }
      const targetUser = message.guild!.members.cache.get(
        filterUserId(args![0])
      );
      const reason = args![1] || "No reason provided";

      if (!targetUser?.user) {
        await channel.send("User not found");
        return;
      }
      try {
        await targetUser.kick(reason);
        await channel.send(
          `${targetUser.user.tag} has been kicked for reason: ${reason}`
        );
      } catch (error) {
        await channel.send(
          "Can't kick this member, they might have a role higher than mine"
        );
      }
    }
  },
} as Command;
