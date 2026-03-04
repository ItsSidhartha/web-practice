import { render, fetchPokemons } from "./scripts/render.js";
import { addOptionsToHeader } from "./scripts/header.js";

const addListenerToSelect = (header) => {
  const select = header.querySelector("select");
  select.addEventListener("change", () => {
    const value = select.value;
    fetchPokemons(value).then(res => render(res.pokemons));
  })
}

const filterPokemons = (pokemons, token) =>
  pokemons.filter(pokemon => pokemon.name.includes(token));


const renderWhenInput = (e, pokemons) => {
  e.preventDefault();
  //debouncing...
  render(filterPokemons(pokemons, e.target.value));
}

const addListenerToSearchBar = (header, pokemons) => {
  const input = header.querySelector("input");
  input.addEventListener("input", (e) => renderWhenInput(e, pokemons))
}

const addEventListenerToHeader = (header, pokemons) => {
  addListenerToSelect(header);
  addListenerToSearchBar(header, pokemons);
}



window.onload = async () => {
  const res = await fetchPokemons("all");
  const header = document.querySelector("header");

  addOptionsToHeader(header, res.allTypes);
  addEventListenerToHeader(header, res.pokemons);
  await render(res.pokemons);
};
