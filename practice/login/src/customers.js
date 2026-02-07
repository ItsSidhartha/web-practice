export class Customers {
  constructor(db) {
    this.db = db;
  }

  init() {
    this.db.exec(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    password TEXT NOT NULL
);`);
  }

  addCustomer(name, age, password) {
    const query = this.db.prepare(
      `INSERT INTO customers (name, age, password) VALUES(?, ?, ?);`,
    );

    query.run(name, age, password);
  }

  fetchAllCustomers() {
    const query = this.db.prepare(
      `SELECT * FROM customers;`,
    );

    return query.all();
  }

  fetchCustomer(name) { // later it should be id may be?
    const query = this.db.prepare(`SELECT * FROM customers WHERE name = ?`);
    return query.get(name);
  }

  doesCustomerExists(name) {
    const query = this.db.prepare(`SELECT * FROM customers WHERE name = ?;`);
    const res = query.get(name);
    return !!res;
  }
}
