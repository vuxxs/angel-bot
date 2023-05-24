import { ChannelType } from "discord.js";
import { CustomClient } from "../interfaces/client.interface";
import { LogLevel, angelogger } from "../utilities/logger";

export default (client: CustomClient): void => {
  client.on("messageCreate", async (message) => {
    if (
      message.channel.type !== ChannelType.GuildText ||
      message.author.id === client.user!.id ||
      !client.commands
    )
      return;
    if (!message.content.startsWith(client.options.prefix)) return;

    const args = message.content
      .slice(client.options.prefix.length)
      .trim()
      .split(/ +/);

    const commandName = args.shift()?.toLowerCase();

    const command = client.commands.get(commandName!);

    if (!command) return;

    try {
      await command.execute(undefined, message, args);
    } catch (err) {
      angelogger(
        LogLevel.ERROR,
        `Error executing command "${commandName}": ${err}`
      );
      message.channel.send("An error occured while executing the command.");
    }
  });
};
