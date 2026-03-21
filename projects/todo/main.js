import { createApp } from "./src/app.js";
import { Eta } from "eta";
import { createDB } from "./src/setup.js";

const main = () => {
  const eta = new Eta({ views: "./public/templates" });
  const renderPage = (path, data) => eta.render(path, data);
  const db = createDB("./data/todo.db");
  const app = createApp(db, renderPage);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
