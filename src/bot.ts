import { Client } from "discord.js";
import {
  CustomClient,
  CustomClientOptions,
} from "./interfaces/client.interface";
import guildCreate from "./events/guildCreate";
import guildDelete from "./events/guildDelete";
import messageCreate from "./events/messageCreate";
import ready from "./events/ready";
require("dotenv").config();

console.log("Bot is starting...");

const options: CustomClientOptions = {
  prefix: "$",
  intents: [
    "DirectMessageReactions",
    "DirectMessageTyping",
    "DirectMessages",
    "GuildBans",
    "GuildEmojisAndStickers",
    "GuildIntegrations",
    "GuildInvites",
    "GuildMembers",
    "GuildMessageReactions",
    "GuildMessageTyping",
    "GuildMessages",
    "GuildPresences",
    "GuildScheduledEvents",
    "GuildVoiceStates",
    "GuildWebhooks",
    "Guilds",
    "MessageContent",
  ],
};

const client = new Client(options) as CustomClient;

// Run events
ready(client);
messageCreate(client);
guildCreate(client);
guildDelete(client);

client.login(process.env.TOKEN);
