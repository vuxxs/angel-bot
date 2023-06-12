import { CustomClient } from "../interfaces/client.interface";
import { angelogger } from "../utilities/logger";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("guildCreate", async (guild) => {
    angelogger.info(`Joined Guild: ${guild.name} ID: ${guild.id}`);

    angelogger.info(
      `Joined new guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members.`
    );

    updateMembersCount(client);
  });
};
