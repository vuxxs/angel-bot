import { CustomClient } from "../interfaces/client.interface";

export default (client: CustomClient): void => {
  client.on("guildDelete", async (guild) => {
    console.log(`Left Guild: ${guild.name} ID: ${guild.id}`);
  });
};
