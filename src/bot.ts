import { Client } from "discord.js";
import {
  CustomClient,
  CustomClientOptions,
} from "./interfaces/client.interface";
import { LogLevel, angelogger } from "./utilities/logger";
import { registerCommands } from "./utilities/registerCommands";
import { readDirArray } from "./utilities/readDirectory";
import { join } from "path";
require("dotenv").config();

angelogger(LogLevel.INFO, "Bot is starting...");

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

// Register commands
client.commands = registerCommands();

if (client.commands.size === 0)
  angelogger(LogLevel.WARN, "No client commands were defined.");

// Run events
const events = readDirArray(join(__dirname, "events"));

if (events) {
  events.forEach((file) => {
    const event = require(join(__dirname, "events", file));
    event.default(client);
  });
} else {
  angelogger(LogLevel.ERROR, "No events were defined.");
}
client.login(process.env.TOKEN);
