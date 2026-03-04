import { createMain } from "./pokemons.js";
import { createSidebar } from "./sidebar.js";

const fetchPokemons = async (type) => {
  const pathname = type === "all" ? `/get-pokemons` : `/get-pokemons${"/" + type}`;
  return await fetch(pathname).then(x => x.json());
}

const addListenterToSidebar = () => {
  const buttons = document.querySelectorAll(".sidebar button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      draw(button.id);
      console.log("clicked");
    })
  })
}

export const draw = async (type = "all") => {
  const body = document.body;
  body.innerHTML = "";
  const res = await fetchPokemons(type);
  const header = createHeader(res.allTypes)
  const sidebar = createSidebar(res.allTypes, type);
  const main = createMain(res.pokemons);
  body.append(sidebar, main);
  addListenterToSidebar();
}