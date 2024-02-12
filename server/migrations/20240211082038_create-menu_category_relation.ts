import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("menu_category_relation", function (table) {
    table.increments().primary();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category");
    table.integer("menu_id").unsigned().references("id").inTable("menu");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("menu_category_relation");
}
