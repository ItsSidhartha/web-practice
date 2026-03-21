import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { servePokemon, serveType } from "./handlers.js";

export const createApp = (renderFn, pokemons) => {
  const app = new Hono();
  app.use(logger());
  app.use(async (c, next) => {
    c.set("pokemons", pokemons);
    c.set("renderFn", renderFn);
    await next();
  });

  app.get("/type/:type", serveType);
  app.get("/pokemon/:name", servePokemon);

  app.get("*", serveStatic({ root: "public" }));
  return app;
};
