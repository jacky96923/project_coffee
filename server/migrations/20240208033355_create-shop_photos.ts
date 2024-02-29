import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("shop_photos", function (table) {
    table.increments().primary();
    table.string("filename", 1000);
    table.boolean("cover_photo");
    table.boolean("logo");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("shop_photos");
}
