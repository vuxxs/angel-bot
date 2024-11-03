import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { CustomClient } from "../interfaces/client.interface";
import { ApplicationCommandType } from "discord.js";
import { readDirArray } from "./readDirectory";
import { join } from "path";
import { drebinlogger } from "./logger";

export const registerSlashCommands = async (
  client: CustomClient,
  clientId: string,
  guildId?: string
) => {
  const commands = Array.from(client.commands.values()).map((command) => {
    return {
      name: command.name,
      description: command.description,
      options: command.options || [],
      type: ApplicationCommandType.ChatInput,
    };
  });

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN!);

  try {
    drebinlogger.info("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    drebinlogger.info("Successfully reloaded application (/) commands.");
  } catch (error) {
    drebinlogger.error(error);
  }
};

export const registerCommands = () => {
  const commands = new Map();

  const commandFiles = readDirArray(join(__dirname, "..", "commands"));

  if (commandFiles) {
    for (const file of commandFiles) {
      const command = require(join(__dirname, "..", "commands", file));
      commands.set(command.default.name, command.default);
    }
  }
  return commands;
};
