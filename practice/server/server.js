const main = async () => {
  const listener = await Deno.listen({ port: 8000 });
  console.log("Server running on http://localhost:8000");
  for await (const conn of listener) {
    handleConn(conn);
  }
};

const greeting = Deno.readTextFileSync("./greeting.html");
const pradipJana = Deno.readTextFileSync("./jana.html");

const createResponseLine = () => "HTTP/1.1 200 OK";
const createHeaders = (headers) => {
  return Object.entries(headers)
    .map(([name, value]) => `${name}: ${value}`)
    .join("\r\n");
};

const createSuccessResponse = (content) => {
  const headers = {
    "Content-Type": "text/html",
    "Content-Length": content.length,
    "Date": new Date(),
    "Batch": "step-batch-11"
  }
  const response = [
    createResponseLine(), createHeaders(headers), "", content
  ].join("\r\n");

  return response;
};

const createNotFoundResponse = () => {
  return `HTTP/1.1 404 NOT FOUND\r\nContent-Type: text/html\r\n\r\n<h3>NOT FOUND</h3>`;
};

const decoder = new TextDecoder();
const encoder = new TextEncoder();

const handleConn = async (conn) => {
  const buf = new Uint8Array(1024);

  const n = await conn.read(buf);
  if (n === null) {
    console.log("Connection closed");
    conn.close();
  }
  const request = decoder.decode(buf.slice(0, n));
  const [requestLine] = request.split("\r\n");
  const [method, path, protocol] = requestLine.split(" ");
  console.log(`Method = ${method}, path = ${path}, protocol = ${protocol}`);

  if (path === "/jana.html") {
    await conn.write(encoder.encode(createSuccessResponse(pradipJana)));
  } else if (path === "/greeting.html" || path === "/") {
    await conn.write(encoder.encode(createSuccessResponse(greeting)));
  } else {
    await conn.write(encoder.encode(createNotFoundResponse()));
  }

  await conn.close();
};

main();