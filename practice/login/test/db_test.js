import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { DatabaseSync } from "node:sqlite";
import { Customers } from "../src/customers.js";
describe("DB", () => {
  const db = new DatabaseSync(":memory:");
  const customers = new Customers(db);
  customers.init();
  it("fething data", () => {
    assertEquals(customers.fetchAllCustomers(), []);
  });

  it("adding data", () => {
    customers.addCustomer("Sidhu", 12, "1234");
    assertEquals(customers.fetchAllCustomers(), [{
      id: 1,
      name: "Sidhu",
      age: 12,
      password: "1234",
    }]);
  });

  it("adding data", () => {
    assertEquals(customers.doesCustomerExists("Sidhu"), true);
    assertEquals(customers.doesCustomerExists("abc"), false);
  });

  it("fetching customer data", () => {
    assertEquals(customers.fetchCustomer("Sidhu"), {
      id: 1,
      name: "Sidhu",
      age: 12,
      password: "1234",
    });
  });
});
