import { addCardsToMain } from "./pokemons.js";

export const fetchPokemons = async (type) => {
  const pathname = type === "all" ? `/get-pokemons` : `/get-pokemons${"/" + type}`;
  return await fetch(pathname).then(x => x.json());
}

export const render = (pokemons) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  addCardsToMain(main, pokemons);
}