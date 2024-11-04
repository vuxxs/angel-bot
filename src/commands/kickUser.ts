import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { Command } from "../interfaces/command.interface";
import {
  getImpetusTarget,
  replyToImpetus,
  getImpetusOption,
} from "../utilities/Impetus";

export default {
  name: "kickuser",
  description: "Kick a member from the server",
  category: "moderation",
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
  async execute(impetus, args) {
    if (!args) args = [];
    const member = impetus.member;
    if (!(member instanceof GuildMember)) return; // Interaction is in DM, return
    if (!member.permissions.has("KickMembers")) {
      replyToImpetus(
        impetus,
        "You do not have the necessary permissions to use this command."
      );
      return;
    }
    const targetUser = getImpetusTarget(impetus, args);
    const reason = getImpetusOption(impetus, args, "reason");

    if (!targetUser) return;

    const targetMember = member.guild.members.cache.get(targetUser.id);

    if (!targetMember) {
      replyToImpetus(impetus, "User not found", undefined, true);
      return;
    }

    try {
      await member.kick(reason);
      replyToImpetus(
        impetus,
        `${targetUser.tag} has been kicked for reason: ${reason}`,
        undefined,
        true
      );
    } catch (error) {
      replyToImpetus(
        impetus,
        "Can't kick this member, they might have a role higher than mine",
        undefined,
        true
      );
    }
  },
} as Command;
