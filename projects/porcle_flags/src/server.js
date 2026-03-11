import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

const filterCountries = (countries, continent) =>
  countries.filter((country) => country.continent === continent);

const normalize = (text) => text.split(/[-_ ]/).join("").toLowerCase();

export const createApp = (countries) => {
  const app = new Hono();
  app.use(logger());

  app.post("/guess", async (c) => {
    const { input, currentId } = await c.req.json();

    const { name } = countries.find((country) => country.id === currentId);
    console.log(name, input);

    const resBody = { name, isCorrect: normalize(name) === normalize(input) };
    return c.json(resBody);
  });

  app.get("/*", serveStatic({ root: "public" }));

  app.get("/countries/:continent", (c) => {
    const continent = c.req.param("continent");
    if (continent === "all") return c.json(countries);
    return c.json(filterCountries(countries, continent));
  });
  return app;
};
