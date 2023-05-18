import { Client } from "discord.js";
import {
  CustomClient,
  CustomClientOptions,
} from "./interfaces/client.interface";
import guildCreate from "./events/guildCreate";
import guildDelete from "./events/guildDelete";
import messageCreate from "./events/messageCreate";
import ready from "./events/ready";
import { readDirArray } from "./utilities/readDirectory";
import { join } from "path";
import { Command } from "./interfaces/command.interface";
import { LogLevel, angelogger } from "./utilities/logger";
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
client.commands = new Map();

const commandFiles = readDirArray(join(__dirname, "commands"));

for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", file));
  client.commands.set(command.default.name, command.default);
}

// Run events
ready(client);
messageCreate(client);
guildCreate(client);
guildDelete(client);

angelogger(LogLevel.INFO, "Ran all events"); // inaccurate, make it async

client.login(process.env.TOKEN);
