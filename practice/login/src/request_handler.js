const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};

const requestHandler = async (request, db) => {
  const { method, url } = request;
  const { pathname } = new URL(url);
  console.log({ method, pathname });

  if (pathname === "/") {
    const content = Deno.readTextFileSync("./pages/home.html");
    return createResponse(content, "text/html", 200);
  }

  if (pathname === "/login") {
    const content = Deno.readTextFileSync("./pages/login.html");
    return createResponse(content, "text/html", 200);
  }

  if (pathname === "/signup") {
    const content = Deno.readTextFileSync("./pages/registation.html");
    return createResponse(content, "text/html", 200);
  }

  if (pathname === "/createAccount" && method === "POST") {
    const data = await request.json();
    console.log(data);
  }
};

export const createRequestHandler = (db) => {
  return (request) => requestHandler(request, db);
};
