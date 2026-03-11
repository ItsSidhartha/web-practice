import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";

const filterCountries = (countries, continent) =>
  countries.filter((country) => country.continent === continent);

export const createApp = (countries) => {
  const app = new Hono();
  app.use(logger());

  app.post("/guess", async (c) => {
    const { input, currentId } = await c.req.json();
    const isCorrect = countries.validate(currentId, input);
    const { names } = countries.find(currentId);

    const resBody = { name: names[0], isCorrect };
    return c.json(resBody);
  });

  app.get("/report", (c) => {
    return c.json({
      correct: countries.correct,
      total: countries.length,
    });
  });

  app.get("/*", serveStatic({ root: "public" }));

  app.get("/countries/:continent", (c) => {
    const continent = c.req.param("continent");
    if (continent === "all") return c.json(countries.fetchAll());
    return c.json(filterCountries(countries.fetchAll(), continent));
  });
  return app;
};
