import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("order", function (table) {
    table.increments().primary();
    table.integer("item_id").unsigned().references("id").inTable("item");
    table.integer("set_id").unsigned().references("id").inTable("set");
    table
      .integer("transaction_id")
      .unsigned()
      .references("id")
      .inTable("transaction");
    table.integer("sub_total").notNullable;
    table.time("created_at").notNullable;
    table.time("updated_at").notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("order");
}
