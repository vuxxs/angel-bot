import { CustomClient } from "../interfaces/client.interface.ts";
import { drebinLogger } from "../utilities/logger.ts";
import { registerSlashCommands } from "../utilities/registerCommands.ts";
import updateMembersCount from "../utilities/updateMembersCount.ts";

export default (client: CustomClient): void => {
  client.on("ready", () => {
    updateMembersCount(client);
    registerSlashCommands(client, client.user!.id);

    drebinLogger.info(`${client.user!.username} is online.`);
  });
};
