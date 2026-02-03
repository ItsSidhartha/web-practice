import { handleRequest } from "./handleRequest.js"
import { serve } from "./server.js";

const main = async() => {
  await serve(8000, handleRequest);
}

await main();