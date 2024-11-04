import {
  CommandInteraction,
  EmbedBuilder,
  InteractionReplyOptions,
  MessagePayload,
} from "discord.js";
import { Impetus } from "../interfaces/command.interface";
import { filterUserId } from "./filterUserId";

export function getImpetusId(impetus: Impetus) {
  if (impetus instanceof CommandInteraction) {
    return impetus.user.id;
  } else {
    return impetus.author.id;
  }
}

export function getImpetusUser(impetus: Impetus) {
  if (impetus instanceof CommandInteraction) {
    return impetus.user;
  } else {
    return impetus.author;
  }
}

export function getImpetusTarget(impetus: Impetus, args: string[]) {
  if (impetus instanceof CommandInteraction) {
    return impetus.options.getUser("target");
  } else {
    if (impetus.guild) {
      const filteredUserObject = impetus.guild.members.cache.get(
        filterUserId(args[0])
      );
      if (filteredUserObject) return filteredUserObject.user;
    }
  }
}

export function getImpetusOption(
  impetus: Impetus,
  args: string[],
  option: string,
  defaultReason?: boolean
) {
  let reason;

  if (defaultReason) reason = "No reason provided.";

  if (impetus instanceof CommandInteraction) {
    const optionProvided = impetus.options.get(option);
    if (optionProvided) reason = optionProvided.value as string;
  } else if (args && args.length > 0) {
    reason = args.join(" ");
  }

  return reason;
}

export async function replyToImpetus(
  impetus: Impetus,
  replyContent:
    | string
    | MessagePayload
    | InteractionReplyOptions
    | { embeds: EmbedBuilder[] }
    | { content: string },
  forceToChannel?: boolean,
  deleteAfterSending: boolean = true
) {
  if (impetus instanceof CommandInteraction) {
    if (forceToChannel && impetus.channel)
      return impetus.channel.send(replyContent as MessagePayload);
    return await impetus.reply(replyContent);
  } else {
    const reply = await impetus.reply(replyContent as MessagePayload);
    if (deleteAfterSending) setTimeout(() => reply.delete(), 10000);
    return reply;
  }
}
