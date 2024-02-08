import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("shop_photos", function (table) {
    table.increments().primary();
  });
}

export async function down(knex: Knex): Promise<void> {}
