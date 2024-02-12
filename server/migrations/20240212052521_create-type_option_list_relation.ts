import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("type_option_list_relation", function (table) {
    table.increments().primary();
    table.integer("type_id").unsigned().references("id").inTable("type");
    table
      .integer("option_list_id")
      .unsigned()
      .references("id")
      .inTable("option_list");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("type_option_list_relation");
}
