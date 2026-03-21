import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";
import { toASCII } from "node:punycode";
export const createApp = (db, renderPage) => {
  const app = new Hono();

  app.use(logger());
  app.use(async (c, next) => {
    c.set("db", db);
    c.set("renderPage", renderPage);
    await next();
  });

  app.post("/todo/delete", (c) => {
    const id = c.req.query("id");
    const db = c.get("db");
    db.deleteTodo(id);
    return c.redirect("/", 303);
  });

  app.post("/todo/add", (c) => {
    const name = c.req.query("name");
    const desc = c.req.query("desc");
    const db = c.get("db");
    console.log({ name, desc });

    db.addTodo(name, desc);
    return c.redirect("/", 303);
  });

  app.post("/task/delete", (c) => {
    const id = c.req.query("id");
    const db = c.get("db");
    db.deleteTask(id);
    return c.redirect("/", 303);
  });

  app.post("/task/add", (c) => {
    const name = c.req.query("name");
    const desc = c.req.query("desc");
    const todo_id = c.req.query("todo_id");
    const db = c.get("db");
    db.addTask(todo_id, name, desc);
    return c.redirect("/", 303);
  });

  app.post("/task/toggle", (c) => {
    const id = c.req.query("id");
    const db = c.get("db");
    db.toggleStatus(id);
    return c.redirect("/", 303);
  });

  app.get("*", serveStatic({ root: "public" }));

  return app;
};
