import {
  ApplicationCommandOptionType,
  ChannelType,
  CommandInteraction,
  GuildMember,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage, sendMessageWaitDelete } from "../utilities/sendMessage";

export default {
  name: "purge",
  description: "Delete a certain number of messages in a channel",
  permissions: ["ManageMessages"],
  options: [
    {
      name: "amount",
      type: ApplicationCommandOptionType.Integer,
      description: "Number of messages to delete",
      required: true,
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
    if (!member.permissions.has("ManageMessages")) {
      sendMessage(
        message,
        interaction,
        "You do not have the necessary permissions to use this command."
      );
      return;
    }

    const amount =
      (interaction?.options.get("amount")!.value as number) ||
      parseInt(args[0]);

    if (!amount) {
      sendMessage(message, interaction, {
        content: "Invalid number of messages to delete.",
      });

      return;
    }

    const channel = interaction?.channel || message?.channel;
    if (!channel) return;
    if (channel.type === ChannelType.DM) {
      sendMessage(
        message,
        interaction,
        "Command can only be used in text channels."
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
        const reply =
          (await interaction?.reply({
            content: `${limit} messages deleted.`,
            ephemeral: true,
          })) || (await message?.channel.send(`${limit} messages deleted.`));
        setTimeout(() => reply?.delete(), 5000); // delete the message after 5 seconds
      }, 1000); /* Delay confirmation message to have enough time to delete everything and avoid crashes */
    } catch (error) {
      sendMessage(
        message,
        interaction,
        "An error occurred while trying to delete messages"
      );
    }
  },
} as Command;
