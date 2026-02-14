const flagsJSON = JSON.parse(Deno.readTextFileSync("./flags.json"));
const data = flagsJSON.map(({ flags, name }) => ({
  src: flags.png,
  name: [name.common, name.official],
}));

Deno.writeTextFileSync("./flags.json", JSON.stringify(data, null, 2));
