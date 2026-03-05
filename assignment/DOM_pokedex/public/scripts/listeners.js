import { render } from "./render.js";

const filterPokemonByType = (pokemons, type) => {
  if (type === "all") return pokemons;
  return pokemons.filter(pokemon => pokemon.types.includes(type));
}


const addListenerToSelect = (header, pokemons) => {
  const select = header.querySelector("select");
  select.addEventListener("change", () => {
    const type = select.value;
    render(filterPokemonByType(pokemons, type));
  });
}

const filterPokemonByToken = (pokemons, token) =>
  pokemons.filter(pokemon => pokemon.name.includes(token));

const renderWhenInput = (e, pokemons) => {
  e.preventDefault();
  render(filterPokemonByToken(pokemons, e.target.value));
}

const addListenerToSearchBar = (header, pokemons) => {
  const input = header.querySelector("input");
  input.addEventListener("input", (e) => renderWhenInput(e, pokemons))
}

export const addListenersToHeader = (header, pokemons) => {
  addListenerToSelect(header, pokemons);
  addListenerToSearchBar(header, pokemons);
}