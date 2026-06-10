import { drebinLogger } from "./logger.ts";

export function readDirArray(path: string | URL): string[] {
  try {
    return Array.from(Deno.readDirSync(path))
      .filter((entry) => entry.isFile && entry.name.endsWith(".ts"))
      .map((entry) => entry.name)
      .sort();
  } catch (e) {
    drebinLogger.error(`Couldn't read a directory: ${String(path)} (${e})`);
    return [];
  }
}
