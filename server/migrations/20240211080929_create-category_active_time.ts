import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category_active_time", function (table) {
    table.increments().primary();
    table.date("day").notNullable;
    table.time("start_time").notNullable;
    table.time("close_time").notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("category_active_time");
}
