import { PATHS } from "./paths.js";

const createResponseLine = (protocol, code) => {
  const messages = {
    200: "OK",
    404: "NOT FOUND",
  };

  return `${protocol} ${code} ${messages[code]}`;
};

const createHeaders = (headers) => {
  return Object.entries(headers)
    .map(([name, value]) => `${name}: ${value}`)
    .join("\r\n");
};

const createResponse = (content, protocol, code) => {
  const headers = {
    "Content-Type": "text/html",
    "Content-Length": content.length,
    "Date": new Date(),
    "Batch": "step-batch-11",
  };

  const response = [
    createResponseLine(protocol, code),
    createHeaders(headers),
    "",
    content,
  ].join("\r\n");

  return response;
};

const getContent = (path) => {
  if (!(path in PATHS)) {
    return Deno.readTextFileSync(`./not_found.html`);
  }

  return Deno.readTextFileSync(PATHS[path]);
};

const decode = (bytes) => new TextDecoder().decode(bytes);
const encode = (text) => new TextEncoder().encode(text);

const readRequest = async (conn) => {
  const buf = new Uint8Array(1024);

  const n = await conn.read(buf);
  if (n === null) {
    console.log("Connection closed");
    conn.close();
  }
  return decode(buf.slice(0, n));
};

const displayRequest = (method, path, protocol) => {
  console.log(`Method = ${method}, path = ${path}, protocol = ${protocol}`);
};

const parseRequest = (request) => {
  const [requestLine] = request.split("\r\n");
  return requestLine.split(" ");
};

const writeResponse = async (conn, response) => {
  await conn.write(encode(response));
};

const handleConn = async (conn) => {
  const request = await readRequest(conn);
  const [method, path, protocol] = parseRequest(request);
  displayRequest(method, path, protocol);
  const content = getContent(path);
  const response = createResponse(content, protocol, 200);
  await writeResponse(conn, response);
  await conn.close();
};

const main = async () => {
  const listener = await Deno.listen({ port: 8000 });
  console.log("Server running on http://localhost:8000");
  for await (const conn of listener) {
    handleConn(conn);
  }
};

main();
