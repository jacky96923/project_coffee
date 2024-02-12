import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category_item_relation", function (table) {
    table.increments().primary();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category");
    table.integer("item_id").unsigned().references("id").inTable("item");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("category_item_relation");
}
