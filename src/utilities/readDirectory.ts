import * as fs from "fs";

export function readDirArray(path: fs.PathLike) {
  return fs.readdirSync(path).filter((file) => file.endsWith(".ts"));
}
