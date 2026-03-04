import { addCardsToMain } from "./pokemons.js";

export const fetchPokemons = async (type) => {
  const pathname = type === "all" ? `/get-pokemons` : `/get-pokemons${"/" + type}`;
  return await fetch(pathname).then(x => x.json());
}

export const draw = async (type = "all") => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const res = await fetchPokemons(type);
  addCardsToMain(main, res.pokemons);
}