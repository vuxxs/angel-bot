import {
  ApplicationCommandOptionData,
  CommandInteraction,
  Message,
  MessageType,
  PermissionResolvable,
} from "discord.js";

export type Impetus = CommandInteraction | Message;
export interface Command {
  name: string;
  description: string;
  category: "utility" | "moderation" | "fun";
  options?: ApplicationCommandOptionData[];
  permissions?: PermissionResolvable[];
  execute: (impetus: Impetus, args?: string[]) => Promise<void>;
}
