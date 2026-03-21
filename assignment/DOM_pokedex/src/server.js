import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

export const createApp = (pokemons, allTypes) => {
  const app = new Hono();

  app.use(logger())

  app.get("/types", (c) => c.json(allTypes));
  app.get("/pokemons", (c) => c.json(pokemons));
  app.get("*", serveStatic({ root: "public" }));

  return app;
};
