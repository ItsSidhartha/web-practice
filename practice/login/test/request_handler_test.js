import { describe, it } from "@std/testing/bdd";
import { createRequestHandler } from "../src/requestHandler.js";
import { assertEquals } from "@std/assert";

describe("Request Handler", () => {
  it("initial test", async () => {
    const requestHandler = createRequestHandler();
    const response = requestHandler();
    const body = await response.text();
    assertEquals(body, "Hello");
  });
});
