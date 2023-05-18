import * as fs from "fs";
import { LogLevel, angelogger } from "./logger";

export function readDirArray(path: fs.PathLike) {
  try {
    return fs.readdirSync(path).filter((file) => file.endsWith(".ts"));
  } catch (e) {
    angelogger(LogLevel.ERROR, `Couldn't read a directory: ${path}`);
  }
}
