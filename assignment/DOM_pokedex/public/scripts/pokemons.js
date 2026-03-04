import { createFragment } from "./fragment.js";

const createTypeTemplate = (type) => [
  "div",
  {},
  [
    "p",
    { class: type },
    type
  ]
]

const createTypeElements = (types) => types.map(createTypeTemplate)

const createStatRow = ([parameter, value]) => [
  "tr",
  {},
  ["td", { class: "parameter" }, parameter],
  ["td", { class: "value" }, `${value}`]
];

const createStatRows = (stats) => Object.entries(stats).map(createStatRow);


const createCard = (pokemon) => {
  const headerTemplate = [
    "div",
    { class: "header" },
    [
      "div",
      { class: "name" },
      pokemon.name
    ],
    [
      "div",
      { class: "types" },
      ...createTypeElements(pokemon.types)
    ]
  ];

  const statTableTemplate = [
    "table",
    { class: "stats" },
    [
      "tbody",
      {},
      ...createStatRows(pokemon.stats)
    ]
  ];

  const imgContainer = [
    "div",
    { class: "img-container" },
    [
      "img",
      { src: pokemon.img, alt: pokemon.name },
      ""
    ]
  ];

  const infoContainer = [
    "div",
    { class: "info-container" },
    headerTemplate,
    statTableTemplate
  ];

  const cardTemplate = [
    "div",
    { class: "card" },
    imgContainer,
    infoContainer
  ];

  return createFragment(...cardTemplate);
}

export const addCardsToMain = (main, pokemons) => {
  const cards = pokemons.map(createCard);
  main.append(...cards);
}