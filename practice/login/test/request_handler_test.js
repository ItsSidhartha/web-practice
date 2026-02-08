import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { createRequestHandler } from "../src/request_handler.js";

describe("Request Handler", () => {
  it("initial test", async () => {
    const requestHandler = createRequestHandler();
    const response = requestHandler();
    const body = await response.text();
    assertEquals(body, "Hello");
  });
});
