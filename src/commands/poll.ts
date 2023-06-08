import {
  ApplicationCommandOptionType,
  CommandInteraction,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";

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
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) {
    const question =
      interaction?.options.get("question")?.value || args?.join(" ");

    const pollMessage = await interaction?.reply({
      content: `Poll: ${question}\n\n👍 Yes\n\n👎 No`,
      fetchReply: true,
    });
    const pollMsg = await message?.channel.send(
      `Poll: ${question}\n\n👍 Yes\n\n👎 No`
    );

    try {
      await pollMessage?.react("👍");
      await pollMessage?.react("👎");
      await pollMsg?.react("👍");
      await pollMsg?.react("👎");
    } catch (error) {
      // Failed to react
    }
  },
} as Command;
