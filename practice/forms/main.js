import { handleRequest } from "./src/app.js";

const main = () => {
  Deno.serve({ port: 8000 }, handleRequest);
};

main();
