import {
  ApplicationCommandOptionType,
  CommandInteraction,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";

// Move this to database
export const afkStatuses: { [userId: string]: string } = {};

export default {
  name: "afk",
  description: "Set your AFK status",
  options: [
    {
      name: "reason",
      type: ApplicationCommandOptionType.String,
      description: "The reason you are AFK",
      required: false,
    },
  ],
  async execute(
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) {
    const reason =
      (interaction?.options.get("reason")?.value as string) ||
      args?.join(" ") ||
      "No reason given";

    const userId = interaction?.user.id || message?.author.id;
    if (!userId) return;

    afkStatuses[userId] = reason;

    await interaction?.reply(`You are now AFK: ${reason}`);
    const reply = await message?.reply(`You are now AFK: ${reason}`);
    setTimeout(() => reply?.delete(), 5000);
  },
} as Command;
