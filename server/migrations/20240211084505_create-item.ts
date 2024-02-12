import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("item", function (table) {
    table.increments().primary();
    table.string("name", 255).notNullable;
    table.string("item_photo", 255).notNullable;
    table.string("size", 60).notNullable;
    table.float("price").notNullable;
    table.string("description", 255);
    table.boolean("is_enabled");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("item");
}
