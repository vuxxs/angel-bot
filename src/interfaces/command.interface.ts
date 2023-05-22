import {
  ApplicationCommandOptionData,
  CommandInteraction,
  Message,
} from "discord.js";

export interface Command {
  name: string;
  description: string;
  options?: ApplicationCommandOptionData[];
  execute: (
    interaction?: CommandInteraction,
    message?: Message,
    args?: String[]
  ) => Promise<void>;
}
