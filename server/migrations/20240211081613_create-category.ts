import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category", function (table) {
    table.increments().primary();
    table.string("name", 255).notNullable;
    table.string("icon", 255);
    table
      .integer("category_active_time_id")
      .unsigned()
      .references("id")
      .inTable("category_active_time");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("category");
}
