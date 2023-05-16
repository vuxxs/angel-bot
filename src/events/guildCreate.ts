import { CustomClient } from "../interfaces/client.interface";

export default (client: CustomClient): void => {
  client.on("guildCreate", async (guild) => {
    console.log(`Joined Guild: ${guild.name} ID: ${guild.id}`);
  });
};
