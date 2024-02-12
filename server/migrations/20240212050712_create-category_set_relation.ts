import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category_set_relation", function (table) {
    table.increments().primary();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category");
    table.integer("set_id").unsigned().references("id").inTable("set");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("category_set_relation");
}
