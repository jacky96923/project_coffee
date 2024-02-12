import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("custom_option", function (table) {
    table.increments().primary();
    table.string("name", 255).notNullable;
    table.float("price");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("custom_option");
}
