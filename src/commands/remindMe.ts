import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface.ts";
import { sendMessage } from "../utilities/sendMessage.ts";

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
  async execute(
    interaction?: ChatInputCommandInteraction,
    message?: Message,
    args?: string[],
  ) {
    const time =
      (interaction?.options.getInteger("time") ||
        parseInt(args?.[0] ?? "", 10)) * 60;
    const reminder =
      interaction?.options.getString("message") || args?.slice(1).join(" ");

    if (!time || !reminder) {
      sendMessage(
        message,
        interaction,
        "You must specify both a time (in minutes) and a reminder message",
      );
      return;
    }

    // Notify the user that the reminder has been set successfully
    await sendMessage(
      message,
      interaction,
      `Got it! I'll remind you in ${time / 60} minute(s).`,
    );

    // Set and then send the reminder
    setTimeout(() => {
      const channel = message?.channel || interaction?.channel;
      const user = message?.author.id || interaction?.user.id;

      if (!channel || !channel.isTextBased() || !("send" in channel) || !user) {
        return;
      }

      void channel.send(`**Reminder!** "${reminder}" <@!${user}>`);
    }, time * 1000);
  },
} as Command;
