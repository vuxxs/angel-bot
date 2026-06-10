import { assert, assertEquals } from "@std/assert";
import { registerCommands } from "./registerCommands.ts";

Deno.test(
  "registerCommands loads command modules from the commands directory",
  async () => {
    const commands = await registerCommands();

    assert(commands.size > 0);
    assert(commands.has("ping"));
    assert(commands.has("help"));

    const pingCommand = commands.get("ping");
    assertEquals(typeof pingCommand?.execute, "function");
  },
);
