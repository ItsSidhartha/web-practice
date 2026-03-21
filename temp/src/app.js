import { Hono } from "hono";
import { logger } from "hono/logger";
import { allowOnlyLoggedInUsers, rejectLoggedinUsers } from "./middlewares.js";
import { addComment, login, logout, serveGuestbook } from "./handlers.js";
import { serveStatic } from "hono/deno";

export const createApp = (comments, renderPage) => {
  const app = new Hono();

  app.use(logger());
  app.use("/login.html", rejectLoggedinUsers);
  app.use(async (c, next) => {
    c.set("comments", comments);  
    c.set("renderPage", renderPage);
    await next();
  });

  app.post("login", rejectLoggedinUsers, login);
  app.post("logout", allowOnlyLoggedInUsers, logout);
  app.post("/comment", allowOnlyLoggedInUsers, addComment);
  app.get("/guest-book.html", serveGuestbook);
  app.get("*", serveStatic({ root: "public" }));

  return app;
};
