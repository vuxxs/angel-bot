import { Client, ClientOptions } from "discord.js";

export interface AdditionalOptions extends ClientOptions {
  // Client options properties go here
  prefix: string; // Could have defined it as a client property but this is a quick way to say it's required
}

export interface CustomClientProperties extends Client {
  // Client properties here
}

export type CustomClientOptions = ClientOptions & AdditionalOptions;

export type CustomClient = Client &
  CustomClientProperties & { options: CustomClientOptions };
