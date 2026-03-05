import { createApp } from "./src/server.js";
import { distinct } from "@std/collections";

const main = async () => {
  const pokemons = await Deno.readTextFile("./data/pokemons.json")
    .then(x => JSON.parse(x))
    .catch((_) => console.error("no data found") || []);

  const allTypes = distinct(pokemons.map(pokemon => pokemon.types).flat());
  const app = createApp(pokemons, allTypes);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
