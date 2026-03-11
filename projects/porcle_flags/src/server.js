import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

const filterCountries = (countries, continent) =>
  countries.filter((country) => country.continent === continent);

const normalize = (text) => text.split(/[-_ ]/).join("").toLowerCase();

const isCorrect = (names, input) =>
  names.some((name) => normalize(name) === normalize(input));

export const createApp = (countries) => {
  const app = new Hono();
  app.use(logger());

  app.post("/guess", async (c) => {
    const { input, currentId } = await c.req.json();
    const { names } = countries.find((country) => country.id === currentId);

    const resBody = { name: names[0], isCorrect: isCorrect(names, input) };
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
