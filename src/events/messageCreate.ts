import { Client, ChannelType } from "discord.js";

export default (client: Client): void => {
  client.on("messageCreate", async (message) => {
    if (
      message.channel.type !== ChannelType.GuildText ||
      message.author.id === client.user!.id
    )
      return;

    // This is where the magic happens
  });
};
