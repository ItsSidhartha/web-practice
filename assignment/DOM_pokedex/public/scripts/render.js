import { createFragment } from "./fragment.js";
import { createCardsTemplate } from "./templates.js";

export const render = (pokemons) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const cardTemplates = createCardsTemplate(pokemons);

  const cardElemnets = cardTemplates.map((template => createFragment(...template)));
  main.append(...cardElemnets);
}