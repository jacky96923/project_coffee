import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("kitchen", function (table) {
    table.increments().primary();
    table.boolean("transaction_done");
    table
      .integer("transaction_id")
      .unsigned()
      .references("id")
      .inTable("transaction");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("kitchen");
}
