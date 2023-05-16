import { ChannelType } from "discord.js";
import { CustomClient } from "../interfaces/client.interface";

export default (client: CustomClient): void => {
  client.on("messageCreate", async (message) => {
    if (
      message.channel.type !== ChannelType.GuildText ||
      message.author.id === client.user!.id
    )
      return;
    // This is where the magic happens
  });
};
