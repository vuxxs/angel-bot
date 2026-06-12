import { Client, ClientOptions } from "discord.js";
import { Command } from "./command.interface.ts";

export interface AdditionalOptions extends ClientOptions {
  prefix: string;
}

export interface CustomClientProperties extends Client {
  commands: Map<string, Command>;
}

export type CustomClientOptions = ClientOptions & AdditionalOptions;

export type CustomClient = Client &
  CustomClientProperties & { options: CustomClientOptions };
