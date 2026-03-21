import { distinct } from "@std/collections";

const filterPokemons = (pokemons, type) => {
  return pokemons.filter((pokemon) => pokemon.types.includes(type));
};

const getTypes = (pokemons) =>
  distinct(
    pokemons
      .map((pokemon) => pokemon.types)
      .flat()
      .sort(),
  );

export const serveType = (context) => {
  const type = context.req.param("type");
  const pokemons = context.get("pokemons");
  const renderFn = context.get("renderFn");
  const allTypes = getTypes(pokemons);

  const pokemonsInType = filterPokemons(pokemons, type);
  const body = renderFn("pokemons_in_type.html", {
    pokemons: pokemonsInType,
    allTypes,
    type,
  });
  return context.html(body);
};

export const servePokemon = (context) => {
  const name = context.req.param("name");
  const pokemons = context.get("pokemons");
  const renderFn = context.get("renderFn");

  const pokemon = pokemons.find((p) => p.name === name);
  if (!pokemon) return context.html("<h1>Not Found</h1>");
  const body = renderFn("pokemon.html", { pokemon });
  return context.html(body);
};
