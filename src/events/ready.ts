import { CustomClient } from "../interfaces/client.interface";
import { drebinlogger } from "../utilities/logger";
import { registerSlashCommands } from "../utilities/registerCommands";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("ready", async () => {
    updateMembersCount(client);

    registerSlashCommands(client, client.user!.id);

    drebinlogger.info(`${client.user!.username} is online.`);
  });
};
