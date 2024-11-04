import { GuildMember } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { replyToImpetus } from "../utilities/Impetus";

export default {
  name: "invite",
  description: "Create an invite to the current channel.",
  category: "utility",
  execute: async (impetus) => {
    const member = impetus.member;
    if (!(member instanceof GuildMember)) return;
    /* FIXME */ replyToImpetus(impetus, "Not available yet");
  },
} as Command;
