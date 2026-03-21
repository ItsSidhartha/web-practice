import { DatabaseSync } from "node:sqlite";
import { SqliteDB } from "./sqlite_todo.js";

export const createDB = (path = ":memory:") => {
  const db = new DatabaseSync(path);
  const storage = new SqliteDB(db);
  storage.createStorage();
  return storage;
};
