import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category_active_time", function (table) {
    table.increments().primary();
    table.string("day", 60);
    table.time("start_time");
    table.time("close_time");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("category_active_time");
}
