import { Client } from "discord.js";

export default (client: Client): void => {
  client.on("guildCreate", async (guild) => {
    console.log(`Joined Guild: ${guild.name} ID: ${guild.id}`);
  });
};
