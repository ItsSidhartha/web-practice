import { Hono } from "hono";
import { serveStatic } from "hono/deno";

export const createApp = (people) => {
  const app = new Hono();
  app.use(async (c, next) => {
    c.set("people", people);
    await next();
  });

  app.post("/add", async (c) => {
    const body = await c.req.json();
    people.push(body);
    return c.json(people);
  });

  app.get("*", serveStatic({ root: "public" }));

  return app;
};
