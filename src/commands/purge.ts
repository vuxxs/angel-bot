import {
  ApplicationCommandOptionType,
  Channel,
  ChannelType,
  CommandInteraction,
  GuildMember,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { LogLevel, angelogger } from "../utilities/logger";

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
    if (interaction) {
      if (!(interaction.member instanceof GuildMember)) return; // Interaction is in DM, return
      if (!interaction.member.permissions.has("ManageMessages")) {
        interaction.reply(
          "You do not have the necessary permissions to use this command."
        );
        return;
      }
      const amount = interaction.options.get("amount")!.value as number;

      if (!amount) {
        interaction.reply({
          content: "Invalid number of messages to delete.",
        });
        return;
      }

      const channel = interaction.channel;
      if (!channel) return;
      if (channel.type === ChannelType.DM) {
        interaction.reply({
          content: "Command can only be used in text channels.",
        });
        return;
      }
      try {
        await channel.bulkDelete(amount, true);
        const reply = await interaction.reply({
          content: `${amount} messages deleted.`,
          ephemeral: true,
        });
        setTimeout(() => reply.delete(), 5000); // delete the message after 5 seconds
      } catch (error) {
        await interaction.reply(
          "An error occurred while trying to delete messages"
        );
      }
    } else if (message) {
      if (!(message.member instanceof GuildMember)) return;
      const channel = message.channel;
      if (channel.type === ChannelType.DM) return;
      if (!message.member.permissions.has("ManageMessages")) {
        channel.send(
          "You do not have the necessary permissions to use this command."
        );
        return;
      }
      try {
        const amount = parseInt(args![0]);
        if (isNaN(amount)) {
          channel.send("Invalid number of messages to delete.");
          return;
        }
        await channel.bulkDelete(amount, true);
        const reply = await channel.send(`${amount} messages deleted.`);
        setTimeout(() => reply.delete(), 5000); // delete the message after 5 seconds
      } catch (error) {
        await channel.send("An error occurred while trying to delete messages");
      }
    }
  },
} as Command;
