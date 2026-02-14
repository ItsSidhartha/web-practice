import { createRequestHandler } from "./src/request_handler.js";

const main = () => {
  const readFile = (filePath) => Deno.readTextFileSync(filePath);
  const handleRequest = createRequestHandler(readFile);
  Deno.serve(handleRequest);
};

main();
