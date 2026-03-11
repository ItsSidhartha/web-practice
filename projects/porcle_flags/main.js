import { Countries } from "./src/countries.js";
import { createApp } from "./src/server.js";

const main = async () => {
  const data = await Deno.readTextFile("./data/countries.json").then((x) =>
    JSON.parse(x),
  );
  
  const countries = new Countries(data);
  const app = createApp(countries);
  Deno.serve({ port: 8080 }, app.fetch);
};

main();
