import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("menu", function (table) {
    table.increments().primary();
    table.string("name", 255).notNullable;
    table.timestamp("last_update");
    table.string("photo", 255);
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("menu");
}
