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
  // const { pathname } = new URL(request.url);
  // console.log(`Method = ${request.method}, Path = ${pathname}`);
  return new Response("hello");
};

export const createRequestHandler = (readFn) => {
  return (request) => handleRequest(request, readFn);
};
