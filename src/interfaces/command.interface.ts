import { CommandInteraction, Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  execute: (
    interaction?: CommandInteraction,
    message?: Message
  ) => Promise<void>;
}
