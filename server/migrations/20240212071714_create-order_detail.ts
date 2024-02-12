import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("order_detail", function (table) {
    table.increments().primary();
    table.integer("order_id").unsigned().references("id").inTable("order");
    table.integer("item_id").unsigned().references("id").inTable("item");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("order_detail");
}
