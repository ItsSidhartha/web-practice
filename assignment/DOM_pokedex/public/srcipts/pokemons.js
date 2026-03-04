const createTypeElement = (type) => {
  const div = document.createElement("div");
  const typeElement = document.createElement("p");
  typeElement.classList.add(type);
  typeElement.innerText = type;
  div.appendChild(typeElement);
  return div;
}

const createTypes = (types) => {
  const typesElement = document.createElement("div");
  typesElement.classList.add("types");
  const typeELements = types.map(createTypeElement);
  typesElement.append(...typeELements);
  return typesElement;
}

const createHeader = (name, types) => {
  const header = document.createElement("div");
  header.classList.add("header");
  const nameElement = document.createElement("div");
  nameElement.classList.add("name");
  nameElement.innerText = name;
  const typesElement = createTypes(types);

  header.append(nameElement, typesElement);
  return header;
}

const createImgContainer = (src, alt) => {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  const image = document.createElement("img");
  image.setAttribute("src", src);
  image.setAttribute("alt", alt);
  imgContainer.appendChild(image);
  return imgContainer;
}

const createStatRow = ([parameter, value]) => {
  const row = document.createElement("tr");
  const parameterElement = document.createElement("td");
  parameterElement.classList.add("parameter");
  parameterElement.innerText = parameter;
  const valueElement = document.createElement("td");
  valueElement.classList.add("value");
  valueElement.innerText = value;

  row.append(parameterElement, valueElement);
  return row;
}

const createStats = (stats) => {
  const statsElement = document.createElement("table");
  statsElement.classList.add("stats");
  const tbody = document.createElement("tbody");
  const rows = Object.entries(stats).map(createStatRow);
  tbody.append(...rows);
  statsElement.appendChild(tbody);
  return statsElement;
}

const createInfoContainer = (name, types, stats) => {
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");
  const headerElement = createHeader(name, types);
  const statsElement = createStats(stats);
  infoContainer.append(headerElement, statsElement);

  return infoContainer;
}

const addBackground = (imgContainer, types) => {
  const gradients = types.map(type => `var(--${type})`);
  imgContainer.style.background = `linear-gradient(${gradients.join(", ")}, white)`
}

const createCard = (pokemon) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const imgContainer = createImgContainer(pokemon.img, pokemon.name);
  addBackground(imgContainer, pokemon.types);
  const infoContainer = createInfoContainer(pokemon.name, pokemon.types, pokemon.stats);
  card.append(imgContainer, infoContainer);
  return card;
}

export const addCardsToMain = (main, pokemons) => {
  main.classList.add("main");
  const cards = pokemons.map(createCard);
  main.append(...cards);
}