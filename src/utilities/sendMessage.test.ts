import { assertEquals } from "@std/assert";
import { sendMessage } from "./sendMessage.ts";

Deno.test(
  "sendMessage prefers channel send when message is provided",
  async () => {
    const message = {
      channel: {
        send: (content: unknown) =>
          Promise.resolve(`message:${String(content)}`),
      },
    };

    const interaction = {
      reply: (content: unknown) =>
        Promise.resolve(`interaction:${String(content)}`),
    };

    const result = await sendMessage(
      message as never,
      interaction as never,
      "hi",
    );
    assertEquals(result, "message:hi");
  },
);

Deno.test(
  "sendMessage uses interaction reply when message is not provided",
  async () => {
    const interaction = {
      reply: (content: unknown) =>
        Promise.resolve(`interaction:${String(content)}`),
    };

    const result = await sendMessage(undefined, interaction as never, "hi");
    assertEquals(result, "interaction:hi");
  },
);
