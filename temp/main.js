import { createApp } from "./src/app.js";
import { Comments } from "./src/comments.js";
import { Eta } from "eta";

const main = () => {
  const eta = new Eta({ views: "./public/templates" });
  const renderPage = (path, data) => eta.render(path, data);
  const comments = new Comments("./data/comments.json");
  const app = createApp(comments, renderPage);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
