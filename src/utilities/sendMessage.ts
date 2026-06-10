import {
  ChatInputCommandInteraction,
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
  interaction: ChatInputCommandInteraction | undefined,
  content: dualContentsType,
) {
  const channel = message?.channel as
    | { send?: (payload: dualContentsType) => Promise<unknown> }
    | undefined;

  if (channel?.send) {
    return await channel.send(content);
  }

  if (interaction) {
    return await interaction.reply(content);
  }

  return undefined;
}

export async function sendMessageWaitDelete(
  message: Message | undefined,
  interaction: ChatInputCommandInteraction | undefined,
  content: dualContentsType,
  time: number,
) {
  const reply = await sendMessage(message, interaction, content);
  setTimeout(() => {
    const deletableReply = reply as { delete?: () => Promise<unknown> };
    void deletableReply.delete?.();
  }, time);
}
