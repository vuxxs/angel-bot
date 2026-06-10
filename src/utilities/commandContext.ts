import {
  ChatInputCommandInteraction,
  GuildMember,
  Message,
  User,
} from "discord.js";
import { filterUserId } from "./filterUserId.ts";

export function normalizeArgs(args?: string[]): string[] {
  return args ?? [];
}

export function getStringInput(
  interaction: ChatInputCommandInteraction | undefined,
  args: string[] | undefined,
  optionName: string,
  argIndex = 0,
): string | undefined {
  return interaction?.options.getString(optionName) ?? args?.[argIndex];
}

export function getStringInputFromRest(
  interaction: ChatInputCommandInteraction | undefined,
  args: string[] | undefined,
  optionName: string,
  argStartIndex = 0,
): string | undefined {
  const fromInteraction = interaction?.options.getString(optionName);
  if (fromInteraction !== null && fromInteraction !== undefined) {
    return fromInteraction;
  }

  if (!args || args.length <= argStartIndex) {
    return undefined;
  }

  return args.slice(argStartIndex).join(" ");
}

export function getIntegerInput(
  interaction: ChatInputCommandInteraction | undefined,
  args: string[] | undefined,
  optionName: string,
  argIndex = 0,
): number | undefined {
  const fromInteraction = interaction?.options.getInteger(optionName);
  if (fromInteraction !== null && fromInteraction !== undefined) {
    return fromInteraction;
  }

  const rawArg = args?.[argIndex];
  if (!rawArg) {
    return undefined;
  }

  const parsed = Number.parseInt(rawArg, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function getInvokingMember(
  interaction?: ChatInputCommandInteraction,
  message?: Message,
): GuildMember | undefined {
  const member = interaction?.member ?? message?.member;
  return member instanceof GuildMember ? member : undefined;
}

export function getTargetUser(
  interaction: ChatInputCommandInteraction | undefined,
  message: Message | undefined,
  args: string[] | undefined,
  optionName = "target",
  argIndex = 0,
): User | undefined {
  const fromInteraction = interaction?.options.getUser(optionName);
  if (fromInteraction) {
    return fromInteraction;
  }

  const rawUserId = args?.[argIndex];
  if (!rawUserId) {
    return undefined;
  }

  return message?.guild?.members.cache.get(filterUserId(rawUserId))?.user;
}
