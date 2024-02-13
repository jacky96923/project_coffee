import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("type", function (table) {
    table.increments().primary();
    table.string("name", 60);
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("type");
}
