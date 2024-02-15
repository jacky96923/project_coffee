import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("opening_days", function (table) {
    table.increments().primary();
    table.string("day", 60);
    table.time("start_time");
    table.time("close_time");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("opening_days");
}


