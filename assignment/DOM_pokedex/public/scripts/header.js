import { createFragment } from "./fragment.js";

const createOption = (type) => {
  const optionTemplate = ["option", { value: type }, type];
  return createFragment(...optionTemplate);
}

export const addOptionsToHeader = (header, types) => {
  const selector = header.querySelector("select");
  const options = types.map(createOption);
  selector.append(...options);
}