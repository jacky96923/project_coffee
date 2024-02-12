import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("type", function (table) {
    table.increments().primary();
    table.string("name", 60);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("type");
}
