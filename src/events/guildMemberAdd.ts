import { CustomClient } from "../interfaces/client.interface";
import updateMembersCount from "../utilities/updateMembersCount";

export default (client: CustomClient): void => {
  client.on("guildMemberAdd", async (member) => {
    updateMembersCount(client);
  });
};
