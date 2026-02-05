import { createRequestHandler } from "./src/request_handler.js";
import { Players } from "./src/players.js";

const main = () => {
  const board = new Array(9).fill("&nbsp;&nbsp;");
  const players = new Players();
  const handleRequest = createRequestHandler(board, players);
  Deno.serve({ port: 8000 }, handleRequest);
};

main();
