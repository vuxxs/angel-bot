import { CustomClient } from "../interfaces/client.interface";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("guildMemberRemove", async (member) => {
    updateMembersCount(client);
  });
};
