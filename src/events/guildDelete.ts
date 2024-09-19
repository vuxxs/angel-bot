import { CustomClient } from "../interfaces/client.interface";
import { drebinlogger } from "../utilities/logger";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("guildDelete", async (guild) => {
    drebinlogger.info(`Removed from guild: ${guild.name} (id: ${guild.id}).`);

    updateMembersCount(client);
  });
};
