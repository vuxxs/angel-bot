import { assertEquals } from "@std/assert";
import { filterUserId } from "./filterUserId.ts";

Deno.test("filterUserId strips mention wrappers", () => {
  assertEquals(filterUserId("<@123456789>"), "123456789");
  assertEquals(filterUserId("<@!123456789>"), "123456789");
  assertEquals(filterUserId("123456789"), "123456789");
});
