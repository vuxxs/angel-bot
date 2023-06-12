import { CommandInteraction, Message } from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage } from "../utilities/sendMessage";

export default {
  name: "ping",
  description: "Check the bot's response",
  category: "utility",
  execute: async (interaction?: CommandInteraction, message?: Message) => {
    sendMessage(
      message,
      interaction,
      `Pong! (${interaction?.client.ws.ping || message?.client.ws.ping}ms)`
    );
  },
} as Command;
