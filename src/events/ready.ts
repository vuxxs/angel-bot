import { ActivityType } from "discord.js";
import { CustomClient } from "../interfaces/client.interface";
import { LogLevel, angelogger } from "../utilities/logger";

export default (client: CustomClient): void => {
  client.on("ready", async () => {
    client.user?.setActivity({
      type: ActivityType.Watching,
      name: `${client.options.prefix}help`,
    });
    angelogger(LogLevel.INFO, `${client.user!.username} is online`);
  });
};
