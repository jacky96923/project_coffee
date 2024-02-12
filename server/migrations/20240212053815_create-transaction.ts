import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transaction", function (table) {
    table.increments().primary();
    table.time("order_time").notNullable;
    table.time("pickup_time").notNullable;
    table.boolean("pick_status").notNullable;
    table.boolean("tagged");
    table.float("total").notNullable;
    table.integer("stripe_id");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("shop_id").unsigned().references("id").inTable("shops");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transaction");
}
