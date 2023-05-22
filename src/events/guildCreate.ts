import { CustomClient } from "../interfaces/client.interface";
import { LogLevel, angelogger } from "../utilities/logger";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("guildCreate", async (guild) => {
    angelogger(LogLevel.INFO, `Joined Guild: ${guild.name} ID: ${guild.id}`);

    angelogger(
      LogLevel.INFO,
      `Joined new guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members.`
    );

    updateMembersCount(client);
  });
};
