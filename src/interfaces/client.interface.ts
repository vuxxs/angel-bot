import { Client, ClientOptions } from "discord.js";
import { Command } from "./command.interface";

export interface AdditionalOptions extends ClientOptions {
  // Client options properties
  // Include properties that must be required
  prefix: string;
}

export interface CustomClientProperties extends Client {
  // Client properties
  // Not required, careful that they might be undefined
  commands: Map<string, Command>;
}

export type CustomClientOptions = ClientOptions & AdditionalOptions;

export type CustomClient = Client &
  CustomClientProperties & { options: CustomClientOptions };
