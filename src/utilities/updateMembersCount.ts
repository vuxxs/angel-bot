import { ActivityType } from "discord.js";
import { CustomClient } from "../interfaces/client.interface";

export default function updateMembersCount(client: CustomClient) {
  // We compute the total number of unique users the bot serves and exclude bots
  const userSet = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      if (!member.user.bot) userSet.add(member.user.id);
    });
  });
  const userCount = userSet.size;

  client.user?.setActivity({
    type: ActivityType.Watching,
    name: `${userCount} users | ${client.options.prefix}help`,
  });
}
