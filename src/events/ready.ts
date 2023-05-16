import { ActivityType, Client } from "discord.js";

export default (client: Client): void => {
  client.on("ready", async () => {
    client.user?.setActivity({
      type: ActivityType.Watching,
      name: `$help`,
    });
    console.log(`${client.user!.username} is online`);
  });
};
