import { render } from "./scripts/render.js";
import { addOptionsToHeader } from "./scripts/header.js";
import { addListenersToHeader } from "./scripts/listeners.js";
import { fetchPokemons, fetchTypes } from "./scripts/data.js";



globalThis.onload = async () => {
  const pokemons = await fetchPokemons("all");
  const allTypes = await fetchTypes();
  const header = document.querySelector("header");

  addOptionsToHeader(header, allTypes);
  addListenersToHeader(header, pokemons);
  await render(pokemons);
};
