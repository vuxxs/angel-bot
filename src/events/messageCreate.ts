import { ChannelType } from "discord.js";
import { afkStatuses } from "../commands/afk";
import { CustomClient } from "../interfaces/client.interface";
import { angelogger } from "../utilities/logger";

export default (client: CustomClient): void => {
  client.on("messageCreate", async (message) => {
    if (
      message.channel.type !== ChannelType.GuildText ||
      message.author.id === client.user!.id ||
      !client.commands
    )
      return;

    // If the author of the message is AFK, remove their AFK status
    if (afkStatuses[message.author.id]) {
      delete afkStatuses[message.author.id];
      await message.reply("Welcome back, your AFK status has been removed.");
    }

    // Check if the message mentions a user that is AFK
    for (const [userId, reason] of Object.entries(afkStatuses)) {
      if (message.mentions.users.has(userId)) {
        await message.reply(`<@${userId}> is currently AFK. Reason: ${reason}`);
      }
    }

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
      angelogger.error(`Error executing command "${commandName}": ${err}`);
      message.channel.send("An error occured while executing the command.");
    }
  });
};
