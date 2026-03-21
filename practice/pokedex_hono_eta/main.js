import { createApp } from "./src/app.js";
import { Eta } from "eta";

const main = async () => {
  const eta = new Eta({ views: "public/templates" });
  const renderFn = (template, data) => eta.render(template, data);
  const rawPokemonData = await Deno.readTextFile("./data/pokemons.json");
  const pokemons = JSON.parse(rawPokemonData);
  const app = createApp(renderFn, pokemons);
  Deno.serve({ port: 8001 }, app.fetch);
};

main();
