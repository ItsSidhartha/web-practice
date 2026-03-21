import { createPage } from "./create_page.js";

const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};

const handleRequest = (request, game) => {
  const { pathname } = new URL(request.url);
  if (pathname === "/favicon.ico") return createResponse("", "text/html", 404);
  if (pathname === "/play-again") game.reset();
  
  const input = Number(pathname.at(-1));
  if (input) game.play(input - 1);
  const content = createPage(game);

  return createResponse(content, "text/html", 200);
};

export const createRequestHandler = (game) => {
  return (request) => handleRequest(request, game);
};
