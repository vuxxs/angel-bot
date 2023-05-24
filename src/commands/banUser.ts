import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { filterUserId } from "../utilities/filterUserId";

export default {
  name: "banuser",
  description: "Ban a member from the server",
  permissions: ["BanMembers"],
  options: [
    {
      name: "target",
      type: ApplicationCommandOptionType.User,
      description: "Select a user to ban",
      required: true,
    },
    {
      name: "reason",
      type: ApplicationCommandOptionType.String,
      description: "Reason for banning the user",
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
      if (!interaction.member?.permissions.has("BanMembers")) {
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
        await member.ban({ reason });
        await interaction.reply(
          `${targetUser.tag} has been baned for reason: ${reason}`
        );
      } catch (error) {
        await interaction.reply(
          "Can't ban this member, they might have a role higher than mine"
        );
      }
    } else if (message) {
      if (!(message.member instanceof GuildMember)) return; // Interaction is in DM, return
      const channel = message.channel;
      if (!message.member.permissions.has("BanMembers")) {
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
        await targetUser.ban({ reason });
        await channel.send(
          `${targetUser.user.tag} has been baned for reason: ${reason}`
        );
      } catch (error) {
        await channel.send(
          "Can't ban this member, they might have a role higher than mine"
        );
      }
    }
  },
} as Command;
