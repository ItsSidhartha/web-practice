import { DatabaseSync } from "node:sqlite";
import { Customers } from "./src/customers.js";
import { createRequestHandler } from "./src/requestHandler.js";

const main = () => {
  const db = new DatabaseSync("data/customer.db");
  const customers = new Customers(db);
  const handleRequest = createRequestHandler(customers);
  Deno.serve(handleRequest);
};

main();
