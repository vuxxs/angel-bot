import { CustomClient } from "../interfaces/client.interface.ts";
import { drebinLogger } from "../utilities/logger.ts";
import { registerSlashCommands } from "../utilities/registerCommands.ts";
import updateMembersCount from "../utilities/updateMembersCount.ts";

export default (client: CustomClient): void => {
  client.on("ready", () => {
    // Set the activity
    updateMembersCount(client);

    // Register commands
    registerSlashCommands(client, client.user!.id);

    // Log that the bot is online
    drebinLogger.info(`${client.user!.username} is online.`);
  });
};
