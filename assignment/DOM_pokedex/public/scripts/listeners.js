import { filterPokemonByToken, filterPokemonByType } from "./data_manupulation.js";
import { render } from "./render.js";

const addListenerToSelect = (header, pokemons) => {
  const select = header.querySelector("select");
  select.addEventListener("change", () => {
    const type = select.value;
    render(filterPokemonByType(pokemons, type));
  });
}

const updatePage = (e, pokemons) => {
  e.preventDefault();
  render(filterPokemonByToken(pokemons, e.target.value));
}

const addListenerToSearchBar = (header, pokemons) => {
  const input = header.querySelector("input");
  input.addEventListener("input", (e) => updatePage(e, pokemons))
}

export const addListenersToHeader = (header, pokemons) => {
  addListenerToSelect(header, pokemons);
  addListenerToSearchBar(header, pokemons);
}