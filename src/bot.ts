import { Client } from "discord.js";
import {
  CustomClient,
  CustomClientOptions,
} from "./interfaces/client.interface";
import { drebinlogger } from "./utilities/logger";
import { registerCommands } from "./utilities/registerCommands";
import { readDirArray } from "./utilities/readDirectory";
import { join } from "path";
require("dotenv").config();

drebinlogger.info("Bot is starting...");

const options: CustomClientOptions = {
  prefix: "$",
  intents: [
    "AutoModerationConfiguration",
    "AutoModerationExecution",
    "Guilds",
    "GuildMembers",
    "GuildBans",
    "GuildEmojisAndStickers",
    "GuildIntegrations",
    "GuildWebhooks",
    "GuildInvites",
    "GuildVoiceStates",
    "GuildPresences",
    "GuildMessages",
    "GuildMessageReactions",
    "GuildMessageTyping",
    "GuildModeration",
    "GuildScheduledEvents",
    "MessageContent",
  ],
};

const client = new Client(options) as CustomClient;

// Register commands
client.commands = registerCommands();

if (client.commands.size === 0)
  drebinlogger.warn("No client commands were defined.");

// Run events
const events = readDirArray(join(__dirname, "events"));

if (events) {
  events.forEach((file) => {
    const event = require(join(__dirname, "events", file));
    event.default(client);
  });
} else {
  drebinlogger.error("No events were defined.");
}
client.login(process.env.TOKEN);
