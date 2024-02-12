import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("option_list", function (table) {
    table.increments().primary();
    table.string("name", 60);
    table
      .integer("custom_option_id")
      .unsigned()
      .references("id")
      .inTable("custom_option");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("option_list");
}
