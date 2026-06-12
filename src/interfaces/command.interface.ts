import {
  ApplicationCommandOptionData,
  ChatInputCommandInteraction,
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
    interaction?: ChatInputCommandInteraction,
    message?: Message,
    args?: string[],
  ) => Promise<void> | void;
}
