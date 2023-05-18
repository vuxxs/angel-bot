import { CustomClient } from "../interfaces/client.interface";
import { LogLevel, angelogger } from "../utilities/logger";

export default (client: CustomClient): void => {
  client.on("guildCreate", async (guild) => {
    angelogger(LogLevel.INFO, `Joined Guild: ${guild.name} ID: ${guild.id}`);
  });
};
