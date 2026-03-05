export const fetchPokemons = async (type) => {
  const pathname = type === "all" ? `/get-pokemons` : `/get-pokemons${"/" + type}`;
  return await fetch(pathname).then(x => x.json());
}