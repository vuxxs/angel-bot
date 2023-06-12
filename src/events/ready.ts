import { CustomClient } from "../interfaces/client.interface";
import { angelogger } from "../utilities/logger";
import { registerSlashCommands } from "../utilities/registerCommands";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("ready", async () => {
    // Set the activity
    updateMembersCount(client);

    // Register commands
    registerSlashCommands(client, client.user!.id);

    // Log that the bot is online
    angelogger.info(`${client.user!.username} is online.`);
  });
};
