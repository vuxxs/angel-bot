import { CustomClient } from "../interfaces/client.interface";
import { angelogger } from "../utilities/logger";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("guildDelete", async (guild) => {
    // Log the guild info
    angelogger.info(`Removed from guild: ${guild.name} (id: ${guild.id}).`);

    updateMembersCount(client);
  });
};
