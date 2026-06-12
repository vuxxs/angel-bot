import { CustomClient } from "../interfaces/client.interface.ts";
import updateMembersCount from "../utilities/updateMembersCount.ts";

export default (client: CustomClient): void => {
  client.on("guildMemberRemove", () => {
    updateMembersCount(client);
  });
};
