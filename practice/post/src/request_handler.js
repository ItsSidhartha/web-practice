const createResponse = (content, type, status) => {
  return new Response(content, {
    headers: { "content-type": type },
    status,
  });
};
const internsFile = "./data/interns.json";

const read = (filePath) => {
  return Deno.readTextFileSync(filePath);
};

const write = (filePath, content) => {
  Deno.writeTextFileSync(filePath, content);
};

const handleRequest = async (request, readFn) => {
  const { pathname } = new URL(request.url);
  console.log(`Method = ${request.method}, Path = ${pathname}`);

  if (pathname === "/interns" && request.method === "GET") {
    const content = read(internsFile);
    return createResponse(content, "application/json", 200);
  }

  if (pathname === "/interns/create" && request.method === "POST") {
    const interns = JSON.parse(read(internsFile), null, 2);
    const intern = await request.json();

    interns.push(intern);
    write(internsFile, JSON.stringify(interns));
    return createResponse("Done", "text/plain", 201);
  }
};

export const createRequestHandler = (readFn) => {
  return (request) => handleRequest(request, readFn);
};
