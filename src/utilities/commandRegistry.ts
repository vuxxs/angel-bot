import { Command } from "../interfaces/command.interface";

const commands: Command[] = [];

// Register a command
export function registerCommand(command: Command) {
  commands.push(command);
}

// Get all registered commands
export function getCommands() {
  return commands;
}
