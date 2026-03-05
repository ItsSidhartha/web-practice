const createTypeTemplate = (type) => [
  "div",
  {},
  [
    "p",
    { class: type },
    type
  ]
]

const createTypeTemplates = (types) => types.map(createTypeTemplate)

const createStatRowTemplate = ([parameter, value]) => [
  "tr",
  {},
  ["td", { class: "parameter" }, parameter],
  ["td", { class: "value" }, `${value}`]
];

const createStatRowTemplates = (stats) => Object.entries(stats).map(createStatRowTemplate);


export const createCardTemplate = (pokemon) => {
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
      ...createTypeTemplates(pokemon.types)
    ]
  ];

  const statTableTemplate = [
    "table",
    { class: "stats" },
    [
      "tbody",
      {},
      ...createStatRowTemplates(pokemon.stats)
    ]
  ];

  const imgContainerTemplates = [
    "div",
    { class: "img-container" },
    [
      "img",
      { src: pokemon.img, alt: pokemon.name },
      ""
    ]
  ];

  const infoContainerTemplates = [
    "div",
    { class: "info-container" },
    headerTemplate,
    statTableTemplate
  ];

  const cardTemplate = [
    "div",
    { class: "card" },
    imgContainerTemplates,
    infoContainerTemplates
  ];

  return cardTemplate;
}

export const createCardsTemplate = (pokemons) => {
  return pokemons.map(createCardTemplate);
}