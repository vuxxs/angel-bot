import {
  ApplicationCommandOptionData,
  CommandInteraction,
  Message,
  PermissionResolvable,
} from "discord.js";

export interface Command {
  name: string;
  description: string;
  category: "utility" | "moderation" | "fun";
  options?: ApplicationCommandOptionData[];
  permissions?: PermissionResolvable[];
  execute: (
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) => Promise<void>;
}
