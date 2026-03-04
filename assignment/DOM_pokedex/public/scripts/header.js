const createOption = (type) => {
  const option = document.createElement("option");
  option.textContent = type;
  option.setAttribute("value", type)
  return option
}

export const addOptionsToHeader = (header, types) => {
  const selector = header.querySelector("select");
  selector.innerHTML = "";
  const options = types.map(createOption);
  selector.append(...options);
}