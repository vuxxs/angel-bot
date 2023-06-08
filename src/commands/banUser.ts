import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { filterUserId } from "../utilities/filterUserId";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "banuser",
  description: "Ban a member from the server",
  category: "moderation",
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
    if (!args) args = [];
    const member = interaction?.member || message?.member;
    if (!(member instanceof GuildMember)) return; // Interaction is in DM, return
    if (!member?.permissions.has("BanMembers")) {
      sendMessage(
        message,
        interaction,
        "You do not have the necessary permissions to use this command."
      );
      return;
    }
    const targetUser =
      interaction?.options.getUser("target") ||
      message?.guild?.members.cache.get(filterUserId(args[0]))?.user;

    if (!targetUser) return;

    const reason =
      (interaction?.options.get("reason")?.value as string) ||
      args[1] ||
      "No reason provided";

    const targetMember = member.guild?.members.cache.get(targetUser.id);

    if (!targetMember) {
      sendMessage(message, interaction, "User not found");
      return;
    }

    try {
      await member.ban({ reason });
      sendMessage(
        message,
        interaction,
        `${targetUser.tag} has been baned for reason: ${reason}`
      );
    } catch (error) {
      sendMessage(
        message,
        interaction,
        "Can't ban this member, they might have a role higher than mine"
      );
    }
  },
} as Command;
