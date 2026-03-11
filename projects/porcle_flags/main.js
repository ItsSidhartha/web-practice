import { createApp } from "./src/server.js";

const main = async () => {
  const countries = await Deno.readTextFile("./data/flags.json").then(x => JSON.parse(x));
  const app = createApp(countries);
  Deno.serve({ port: 8000 }, app.fetch);
}

main();
