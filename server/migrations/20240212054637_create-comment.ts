import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comment", function (table) {
    table.increments().primary();
    table.integer("rating");
    table.text("description");
    table
      .integer("transaction_id")
      .unsigned()
      .references("id")
      .inTable("transaction");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
    console.log('This is my function');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comment");
}
