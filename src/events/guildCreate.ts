import { CustomClient } from "../interfaces/client.interface";
import { drebinlogger } from "../utilities/logger";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("guildCreate", async (guild) => {
    drebinlogger.info(`Joined Guild: ${guild.name} ID: ${guild.id}`);

    drebinlogger.info(
      `Joined new guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members.`
    );

    updateMembersCount(client);
  });
};
