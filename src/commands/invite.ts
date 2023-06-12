import { CommandInteraction, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "invite",
  description: "Receive an invite to the bot's official server",
  category: "utility",
  execute: async (interaction?: CommandInteraction, message?: Message) => {
    sendMessage(message, interaction, "https://discord.gg/3JqRyPCvuZ");
  },
} as Command;
