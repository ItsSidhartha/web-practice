const decode = (bytes) => new TextDecoder().decode(bytes);
const encode = (text) => new TextEncoder().encode(text);

const readRequest = async (conn) => {
  const buf = new Uint8Array(1024);
  const n = await conn.read(buf);
  return decode(buf.slice(0, n));
};

const displayRequest = ({ method, path, protocol }) => {
  console.log(`Method = ${method}, path = ${path}, protocol = ${protocol}`);
};

const parseRequest = (request) => {
  const [requestLine] = request.split("\r\n");
  const [method, path, protocol] = requestLine.split(" ");
  return { method, path, protocol };
};

const writeResponse = async (conn, response) => {
  await conn.write(encode(response));
};

const formatResponseLine = (responseLine) => {
  return `${responseLine.protocol} ${responseLine.statusCode} ${responseLine.message}`;
};

const formatHeaders = (headers) =>
  Object.entries(headers)
    .map(([name, value]) => `${name}: ${value}`)
    .join("\r\n");

const formatResponse = (response) => {
  const responseLine = formatResponseLine(response.responseLine);
  const headers = formatHeaders(response.headers);

  return [responseLine, headers, "", response.body].join("\r\n");
};

const handleConn = async (conn, handleRequest) => {
  const request = await readRequest(conn);
  const parsedRequest = parseRequest(request);
  displayRequest(parsedRequest);
  const response = await handleRequest(parsedRequest);
  const formatedResponse = formatResponse(response);
  await writeResponse(conn, formatedResponse);
  conn.close();
};

const startListening = async (port) => {
  const listener = await Deno.listen({ port });
  console.log(`Server running on http://localhost:${port}`);
  return listener;
};

export const serve = async (port, requestHandler) => {
  const listener = await startListening(port);
  for await (const conn of listener) {
    handleConn(conn, requestHandler);
  }
};
