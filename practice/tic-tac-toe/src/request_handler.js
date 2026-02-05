import { page } from "./create_page.js";

const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};

const handleRequest = (request, BOARD, players) => {
  const { pathname } = new URL(request.url);
  const input = pathname.at(-1);
  players.play(BOARD, input - 1);
  const content = page(BOARD);

  return createResponse(content, "text/html", 200);
};

export const createRequestHandler = (BOARD, players) => {
  return (request) => handleRequest(request, BOARD, players);
};
