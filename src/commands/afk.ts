import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../interfaces/command.interface";

import {
  getImpetusId,
  getImpetusOption,
  replyToImpetus,
} from "../utilities/Impetus";

export const afkStatuses: { [userId: string]: string } = {};

export default {
  name: "afk",
  description: "Set your AFK status",
  category: "utility",
  options: [
    {
      name: "reason",
      type: ApplicationCommandOptionType.String,
      description: "The reason you are AFK",
      required: false,
    },
  ],
  async execute(impetus, args = []) {
    const userId = getImpetusId(impetus);
    if (!userId) return;

    const reason = getImpetusOption(impetus, args, "reason", true);

    afkStatuses[userId] = reason!;

    replyToImpetus(impetus, `You are now AFK: ${reason}`, undefined, true);
  },
} as Command;
