import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users_fav_shops_relation", function (table) {
    table.increments().primary();
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users_fav_shops_relation");
}
