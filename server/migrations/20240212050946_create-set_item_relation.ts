import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("set_item_relation", function (table) {
    table.increments().primary();
    table.integer("item_id").unsigned().references("id").inTable("item");
    table.integer("set_id").unsigned().references("id").inTable("set");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("set_item_relation");
}
