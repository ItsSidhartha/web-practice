import { render } from "./scripts/render.js";
import { addOptionsToHeader } from "./scripts/header.js";
import { addListenersToHeader } from "./scripts/listeners.js";
import { fetchPokemons } from "./scripts/fetch.js";



window.onload = async () => {
  const res = await fetchPokemons("all");
  const header = document.querySelector("header");

  addOptionsToHeader(header, res.allTypes);
  addListenersToHeader(header, res.pokemons);
  await render(res.pokemons);
};
