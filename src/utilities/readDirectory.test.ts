import { assertEquals } from "@std/assert";
import { readDirArray } from "./readDirectory.ts";

Deno.test(
  "readDirArray returns only TypeScript files in sorted order",
  async () => {
    const tempDir = await Deno.makeTempDir();

    try {
      await Deno.writeTextFile(`${tempDir}/b.ts`, "export {};");
      await Deno.writeTextFile(`${tempDir}/a.ts`, "export {};");
      await Deno.writeTextFile(`${tempDir}/ignore.js`, "");
      await Deno.mkdir(`${tempDir}/subdir`);

      assertEquals(readDirArray(tempDir), ["a.ts", "b.ts"]);
    } finally {
      await Deno.remove(tempDir, { recursive: true });
    }
  },
);
