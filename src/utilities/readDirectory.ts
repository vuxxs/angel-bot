import * as fs from "fs";
import { drebinlogger } from "./logger";

export function readDirArray(path: fs.PathLike) {
  try {
    return fs.readdirSync(path).filter((file) => file.endsWith(".ts"));
  } catch (e) {
    drebinlogger.error(`Couldn't read a directory: ${path}`);
  }
}
