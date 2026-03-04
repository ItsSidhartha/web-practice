const main = () => {
  const mbs = Deno.args[0] || 1;
  const size = 1024 * 1024 * mbs;

  const text = new TextEncoder().encode("A".repeat(size));
  Deno.writeTextFileSync("large_file.txt", text);
}

main();