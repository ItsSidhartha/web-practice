export const filterPokemonByToken = (pokemons, token) =>
  pokemons.filter(pokemon => pokemon.name.includes(token));

export const filterPokemonByType = (pokemons, type) => {
  if (type === "all") return pokemons;
  return pokemons.filter(pokemon => pokemon.types.includes(type));
}

export const fetchPokemons = () => {
  return fetch("/pokemons").then(x => x.json());
}

export const fetchTypes = () => {
  return fetch("/types").then(res => res.json());
}