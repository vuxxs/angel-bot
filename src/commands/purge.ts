import {
  ApplicationCommandOptionType,
  ChannelType,
  CommandInteraction,
  GuildMember,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { getImpetusOption, replyToImpetus } from "../utilities/Impetus";

export default {
  name: "purge",
  description: "Delete a certain number of messages in a channel",
  category: "moderation",
  permissions: ["ManageMessages"],
  options: [
    {
      name: "amount",
      type: ApplicationCommandOptionType.Integer,
      description: "Number of messages to delete",
      required: true,
    },
  ],
  async execute(impetus, args = []) {
    if (!args) args = [];
    const member = impetus.member;
    if (!(member instanceof GuildMember)) return; // Interaction is in DM, return
    if (!member.permissions.has("ManageMessages")) {
      replyToImpetus(
        impetus,
        "You do not have the necessary permissions to use this command.",
        undefined,
        true
      );
      return;
    }

    const amount = Number(getImpetusOption(impetus, args, "amount"));

    if (!amount) {
      replyToImpetus(
        impetus,
        {
          content: "Invalid number of messages to delete.",
        },
        undefined,
        true
      );

      return;
    }

    const channel = impetus.channel;
    if (!channel) return;

    if (channel.type === ChannelType.DM) {
      replyToImpetus(
        impetus,
        "Command can only be used in text channels.",
        undefined,
        true
      );

      return;
    }
    try {
      const limit = Math.min(amount, 100); // limit to 100, max amount allowed for bulkDelete
      const fetchedMessages = channel.messages.fetch({ limit });

      const deletableMessages = (await fetchedMessages).filter(
        (message) =>
          Date.now() - message.createdTimestamp < 14 * 24 * 60 * 60 * 1000
      );

      await channel.bulkDelete(deletableMessages, true);
      setTimeout(async () => {
        replyToImpetus(
          impetus,
          {
            content: `${limit} messages deleted.`,
            ephemeral: true,
          },
          undefined,
          true
        );
      }, 1000); // We delay confirmation message to have enough time to delete everything and avoid crashes
    } catch (error) {
      replyToImpetus(
        impetus,
        "An error occurred while trying to delete messages",
        undefined,
        true
      );
    }
  },
} as Command;
