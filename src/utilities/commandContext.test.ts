import { assertEquals } from "@std/assert";
import {
  getIntegerInput,
  getStringInput,
  getStringInputFromRest,
  normalizeArgs,
} from "./commandContext.ts";

Deno.test("normalizeArgs returns empty array for undefined", () => {
  assertEquals(normalizeArgs(undefined), []);
});

Deno.test("getStringInput falls back to args when interaction is missing", () => {
  assertEquals(getStringInput(undefined, ["hello"], "message", 0), "hello");
});

Deno.test("getStringInputFromRest joins remaining args", () => {
  assertEquals(
    getStringInputFromRest(undefined, ["hello", "world"], "message", 0),
    "hello world",
  );
});

Deno.test("getIntegerInput parses integer from args", () => {
  assertEquals(getIntegerInput(undefined, ["15"], "amount", 0), 15);
});

Deno.test("getIntegerInput returns undefined for invalid values", () => {
  assertEquals(getIntegerInput(undefined, ["abc"], "amount", 0), undefined);
});
