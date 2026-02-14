const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};

const write = (filePath, content) => {
  Deno.writeTextFileSync(filePath, content);
};

const handleRequest = async (request, readFn) => {
  const { pathname } = new URL(request.url);
  console.log(`Method = ${request.method}, Path = ${pathname}`);
  const pokeFile = "./data/pokemons.json";
  if (pathname === "/" && request.method === "GET") {
    const content = readFn("./pages/home.html");
    return createResponse(content, "text/html", 200);
  }

  if (pathname === "/pokis" && request.method === "GET") {
    const content = readFn(pokeFile);
    return createResponse(content, "application/json", 200);
  }

  if (pathname === "/pokis/create" && request.method === "POST") {
    const pokis = JSON.parse(readFn(pokeFile), null, 2);
    const poki = await request.json();

    pokis.push(poki);
    write(pokeFile, JSON.stringify(pokis));
    return createResponse("Done", "text/plain", 201);
  }
};

export const createRequestHandler = (readFn) => {
  return (request) => handleRequest(request, readFn);
};
