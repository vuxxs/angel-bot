import {
  ApplicationCommandOptionType,
  CommandInteraction,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { getImpetusOption, replyToImpetus } from "../utilities/Impetus";

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
  async execute(impetus, args = []) {
    const question = getImpetusOption(impetus, args, "");

    const pollMessage = (await replyToImpetus(
      impetus,
      {
        content: `Poll: ${question}\n\n👍 Yes\n\n👎 No`,
        fetchReply: true,
      },
      true,
      true
    )) as Message;

    try {
      await pollMessage.react("👍");
      await pollMessage.react("👎");
    } catch (error) {
      // Failed to react
    }
  },
} as Command;
