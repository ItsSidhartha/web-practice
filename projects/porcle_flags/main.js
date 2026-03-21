import { Countries } from "./src/countries.js";
import { createApp } from "./src/server.js";

const main = async () => {
  const port = Deno.env.get("port") || 8080;
  const data = await Deno.readTextFile("./data/countries.json").then((x) =>
    JSON.parse(x),
  );

  const countries = new Countries(data);
  const app = createApp(countries);
  Deno.serve({ port }, app.fetch);
};

main();
