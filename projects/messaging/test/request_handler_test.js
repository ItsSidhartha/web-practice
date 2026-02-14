import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { createRequestHandler } from "../src/request_handler.js";

describe("Request Handler", () => {
  it("initial test", async () => {
    const request = new Request("http://localhost:8000");
    const requestHandler = createRequestHandler();
    const response = requestHandler(request);
    const body = await response.text();
    assertEquals(body, "Hello");
  });
});
