import * as fs from "fs";
import { angelogger } from "./logger";

export function readDirArray(path: fs.PathLike) {
  try {
    return fs.readdirSync(path).filter((file) => file.endsWith(".ts"));
  } catch (e) {
    angelogger.error(`Couldn't read a directory: ${path}`);
  }
}
