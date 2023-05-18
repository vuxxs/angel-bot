import { CustomClient } from "../interfaces/client.interface";
import { LogLevel, angelogger } from "../utilities/logger";

export default (client: CustomClient): void => {
  client.on("guildDelete", async (guild) => {
    angelogger(LogLevel.INFO, `Left Guild: ${guild.name} ID: ${guild.id}`);
  });
};
