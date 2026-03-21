export const getRow = (db, table, task_id) => {
  const coloum = table === "tasks" ? "task_id" : "todo_id";
  const query = db.prepare(`SELECT * FROM "${table}" WHERE "${coloum}" = ?`);
  return query.get(task_id);
};

export class SqliteDB {
  constructor(db) {
    this.db = db;
  }

  createStorage() {
    this.db.exec(`CREATE TABLE IF NOT EXISTS todos (
      todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    );`);

    this.db.exec(`CREATE TABLE IF NOT EXISTS tasks (
      task_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      is_done BOOLEAN DEFAULT 0,
      todo_id INTEGER REFERENCES todos(todo_id) ON DELETE CASCADE
    );`);
  }

  addTodo(name, description) {
    const query = this.db.prepare(
      `INSERT INTO todos (name, description) VALUES (?, ?);`,
    );
    const queryDetails = query.run(name, description);
    return { name, description, todo_id: queryDetails.lastInsertRowid };
  }

  listAllTodos() {
    const query = this.db.prepare(`SELECT * FROM todos`);
    return query.all();
  }

  deleteTodo(todo_id) {
    const query = this.db.prepare(`DELETE FROM todos WHERE todo_id = ?`);
    const todoToDelete = getRow(this.db, "todos", todo_id);
    query.run(todo_id);
    return todoToDelete;
  }

  countTodo() {
    const res = this.db.prepare("SELECT COUNT(*) FROM todos").get();
    return res["COUNT(*)"];
  }

  addTask(todo_id, name, description) {
    const query = this.db.prepare(
      `INSERT INTO tasks (name, description, todo_id) VALUES (?, ?, ?);`,
    );

    const res = query.run(name, description, todo_id);
    return { name, description, task_id: res.lastInsertRowid, todo_id };
  }

  viewAllTaskInTodo(todo_id) {
    const query = this.db.prepare(
      `SELECT * FROM tasks WHERE todo_id = ?`,
    );
    return query.all(todo_id);
  }

  toggleStatus(task_id) {
    const query = this.db.prepare(
      `UPDATE tasks SET is_done = 1 - is_done WHERE task_id = ?`,
    );

    query.run(task_id);
    return getRow(this.db, "tasks", task_id);
  }

  deleteTask(task_id) {
    const query = this.db.prepare(`DELETE FROM tasks WHERE task_id = ?`);
    const taskToDelete = getRow(this.db, "tasks", task_id);
    query.run(task_id);
    return taskToDelete;
  }

  countTask(todo_id) {
    const res = this.db.prepare("SELECT COUNT(*) FROM tasks WHERE todo_id = ?")
      .get(todo_id);
    return res["COUNT(*)"];
  }
}
