import { ActivityType } from "discord.js";
import { CustomClient } from "../interfaces/client.interface";

export default (client: CustomClient): void => {
  client.on("ready", async () => {
    client.user?.setActivity({
      type: ActivityType.Watching,
      name: `${client.options.prefix}help`,
    });
    console.log(`${client.user!.username} is online`);
  });
};
