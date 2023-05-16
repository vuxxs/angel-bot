import { Client } from "discord.js";

export default (client: Client): void => {
  client.on("guildDelete", async (guild) => {
    console.log(`Left Guild: ${guild.name} ID: ${guild.id}`);
  });
};
