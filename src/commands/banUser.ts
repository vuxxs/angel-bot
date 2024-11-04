import { Command } from "../interfaces/command.interface";

import { ApplicationCommandOptionType, GuildMember } from "discord.js";

import {
  getImpetusOption,
  getImpetusTarget,
  replyToImpetus,
} from "../utilities/Impetus";

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
  async execute(impetus, args = []) {
    const member = impetus.member;

    if (!(member instanceof GuildMember)) return; // Interaction is in DM, return

    if (!member.permissions.has("BanMembers")) {
      replyToImpetus(
        impetus,
        "You do not have the necessary permissions to use this command."
      );
      return;
    }
    const targetUser = getImpetusTarget(impetus, args);

    if (!targetUser) return;

    const reason = getImpetusOption(impetus, args, "reason");

    const targetMember = member.guild.members.cache.get(targetUser.id);

    if (!targetMember) {
      replyToImpetus(impetus, "User not found", undefined, true);
      return;
    }

    try {
      await member.ban({ reason });
      replyToImpetus(
        impetus,
        `${targetUser.tag} has been banned\nReason: \`\`\`${reason}\`\`\``,
        undefined,
        true
      );
    } catch (error) {
      replyToImpetus(
        impetus,
        "Can't ban this member, they might have a more powerful role than mine!",
        undefined,
        true
      );
    }
  },
} as Command;
