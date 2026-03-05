export const filterPokemonByToken = (pokemons, token) =>
  pokemons.filter(pokemon => pokemon.name.includes(token));

export const filterPokemonByType = (pokemons, type) => {
  if (type === "all") return pokemons;
  return pokemons.filter(pokemon => pokemon.types.includes(type));
}

export const fetchPokemons = async (type) => {
  const pathname = type === "all" ? `/get-pokemons` : `/get-pokemons${"/" + type}`;
  return await fetch(pathname).then(x => x.json());
}