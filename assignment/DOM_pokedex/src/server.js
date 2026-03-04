import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

const filterPokemons = (pokemons, type) => pokemons.filter(({ types }) => types.includes(type));

const servePokemons = (c, pokemons, allTypes) => {
  const type = c.req.param("type");

  if (!type) return c.json({ pokemons, allTypes });

  const filteredPokemons = filterPokemons(pokemons, type);
  return c.json({ pokemons: filteredPokemons, allTypes });
}

export const createApp = (pokemons, allTypes) => {
  const app = new Hono();

  app.use(logger())

  app.get("/get-pokemons/:type?", (c) => servePokemons(c, pokemons, allTypes));

  app.get("*", serveStatic({ root: "public" }));

  return app;
};
