import {
  ApplicationCommandOptionData,
  CommandInteraction,
  Message,
  PermissionResolvable,
} from "discord.js";

export interface Command {
  name: string;
  description: string;
  options?: ApplicationCommandOptionData[];
  permissions?: PermissionResolvable[];
  execute: (
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) => Promise<void>;
}
