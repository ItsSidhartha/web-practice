import { addCardsToMain } from "./pokemons.js";



export const render = (pokemons) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  addCardsToMain(main, pokemons);
}