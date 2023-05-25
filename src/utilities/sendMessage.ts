import {
  CommandInteraction,
  EmbedBuilder,
  Message,
  MessagePayload,
} from "discord.js";

export type dualContentsType =
  | string
  | MessagePayload
  | { embeds: EmbedBuilder[] }
  | { content: string };

export async function sendMessage(
  message: Message | undefined,
  interaction: CommandInteraction | undefined,
  content: dualContentsType
) {
  return (
    (await message?.channel.send(content)) ||
    (await interaction?.reply(content))
  );
}

export async function sendMessageWaitDelete(
  message: Message | undefined,
  interaction: CommandInteraction | undefined,
  content: dualContentsType,
  time: number
) {
  const reply = await sendMessage(message, interaction, content);
  setTimeout(() => reply!.delete(), time);
}
