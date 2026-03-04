import { draw, fetchPokemons } from "./srcipts/draw.js";
import { addOptionsToHeader } from "./srcipts/header.js";

const addEventListenerToHeader = (header) => {
  const select = header.querySelector("select");
  select.addEventListener("change", () => {
    const value = select.value;
    draw(value);
  })
}

window.onload = async () => {
  const res = await fetchPokemons("all");
  const header = document.querySelector("header");

  addOptionsToHeader(header, res.allTypes);
  addEventListenerToHeader(header);
  await draw();
};
