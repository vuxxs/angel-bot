import {
  ApplicationCommandOptionType,
  CommandInteraction,
  Message,
} from "discord.js";
import { Command } from "../interfaces/command.interface";
import { sendMessage } from "../utilities/sendMessage";

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
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) {
    const time =
      (interaction?.options.get("time")!.value as number) * 60 ||
      parseInt(args![0]) * 60;
    const reminder =
      (interaction?.options.get("message")!.value as string) ||
      args?.slice(1).join(" ");

    if (!time || !reminder) {
      sendMessage(
        message,
        interaction,
        "You must specify both a time (in minutes) and a reminder message"
      );
      return;
    }

    // Notify the user that the reminder has been set successfully
    await sendMessage(
      message,
      interaction,
      `Got it! I'll remind you in ${time / 60} minute(s).`
    );

    // Set and then send the reminder
    setTimeout(async () => {
      const channel = message?.channel || interaction?.channel;
      const user = message?.author.id || interaction?.user.id;
      channel!.send(`**Reminder!** "${reminder}" <@!${user}>`);
    }, time * 1000);
  },
} as Command;
