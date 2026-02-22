import { createRequestHandler } from "./src/request_handler.js";
import { Game } from "./src/game.js";

const main = () => {
  const game = new Game();
  const handleRequest = createRequestHandler(game);
  Deno.serve({ port: 8000 }, handleRequest);
};

main();
