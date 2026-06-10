import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface.ts";

export default {
  name: "poll",
  description: "Starts a poll, users can vote by reacting to the message",
  category: "utility",
  options: [
    {
      name: "question",
      type: ApplicationCommandOptionType.String,
      description: "The poll question",
      required: true,
    },
  ],
  async execute(
    interaction?: ChatInputCommandInteraction,
    message?: Message,
    args?: string[],
  ) {
    const question =
      interaction?.options.getString("question") || args?.join(" ");

    const messageChannel = message?.channel;
    const canSendToMessageChannel =
      messageChannel?.isTextBased() && "send" in messageChannel;

    const pollMessage = await interaction?.reply({
      content: `Poll: ${question}\n\n👍 Yes\n\n👎 No`,
      fetchReply: true,
    });
    const pollMsg = canSendToMessageChannel
      ? await messageChannel.send(`Poll: ${question}\n\n👍 Yes\n\n👎 No`)
      : undefined;

    try {
      await pollMessage?.react("👍");
      await pollMessage?.react("👎");
      await pollMsg?.react("👍");
      await pollMsg?.react("👎");
    } catch (_error) {
      // Failed to react
    }
  },
} as Command;
