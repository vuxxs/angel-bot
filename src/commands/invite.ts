import { CommandInteraction, GuildMember, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "invite",
  description: "Create an invite to the current channel.",
  category: "utility",
  execute: async (interaction?: CommandInteraction, message?: Message) => {
    const member = interaction?.member || message?.member;
    if (!(member instanceof GuildMember)) return;
    /* FIXME */ sendMessage(message, interaction, "Not available yet");
  },
} as Command;
