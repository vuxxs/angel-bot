import { Command } from "../interfaces/command.interface";
import { replyToImpetus } from "../utilities/Impetus";

export default {
  name: "ping",
  description: "Check the bot's response",
  category: "utility",
  execute: async (impetus) => {
    replyToImpetus(impetus, `Pong! (${impetus.client.ws.ping}ms)`);
  },
} as Command;
