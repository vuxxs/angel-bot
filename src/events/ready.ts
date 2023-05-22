import { ActivityType } from "discord.js";
import { CustomClient } from "../interfaces/client.interface";
import { LogLevel, angelogger } from "../utilities/logger";
import { registerSlashCommands } from "../utilities/registerCommands";

export default (client: CustomClient): void => {
  client.on("ready", async () => {
    // Compute the total number of unique users the bot serves, excluding bots
    const userSet = new Set();
    client.guilds.cache.forEach((guild) => {
      guild.members.cache.forEach((member) => {
        if (!member.user.bot) userSet.add(member.user.id);
      });
    });
    const userCount = userSet.size;

    // Set the activity
    client.user?.setActivity({
      type: ActivityType.Watching,
      name: `${userCount} users | ${client.options.prefix}help`,
    });

    // Register slash commands

    const clientId = client.user?.id;
    if (clientId) {
      await registerSlashCommands(client, clientId);
    }

    // Log that the bot is online
    angelogger(
      LogLevel.INFO,
      `${client.user!.username} is online and serving ${userCount} users.`
    );
  });
};
