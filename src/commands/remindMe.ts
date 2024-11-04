import {
  ApplicationCommandOptionType,
  CommandInteraction,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import {
  getImpetusId,
  getImpetusOption,
  replyToImpetus,
} from "../utilities/Impetus";

export default {
  name: "remindme",
  description: "Sets a reminder for a certain number of minutes",
  category: "utility",
  options: [
    {
      name: "time",
      type: ApplicationCommandOptionType.Integer,
      description: "The number of minutes to wait before reminding you",
      required: true,
    },
    {
      name: "message",
      type: ApplicationCommandOptionType.String,
      description: "The reminder message",
      required: true,
    },
  ],
  async execute(impetus, args = ["1"]) {
    const timeOption = Number(getImpetusOption(impetus, args, "time"));

    let time;
    if (timeOption) {
      time = timeOption * 60;
    } else {
      time = parseInt(args[0]) * 60;
    }

    const reminder = getImpetusOption(impetus, args, "message");

    if (!time || !reminder) {
      replyToImpetus(
        impetus,
        "You must specify both a time (in minutes) and a reminder message",
        undefined,
        true
      );
      return;
    }

    await replyToImpetus(
      impetus,
      `Got it! I'll remind you in ${time / 60} minute(s).`,
      undefined,
      true
    );

    setTimeout(async () => {
      const channel = impetus.channel;
      const user = getImpetusId(impetus);
      if (channel) channel.send(`**Reminder!** "${reminder}" <@!${user}>`);
    }, time * 1000);
  },
} as Command;
