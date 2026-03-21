import { createApp } from "./src/server.js";

const main = () => {
  const people = [];
  const app = createApp(people);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
