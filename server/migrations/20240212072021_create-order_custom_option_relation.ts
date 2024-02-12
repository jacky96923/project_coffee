import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    "order_custom_option_relation",
    function (table) {
      table.increments().primary();
      table
        .integer("order_detail_id")
        .unsigned()
        .references("id")
        .inTable("order_detail");
      table
        .integer("custom_option_id")
        .unsigned()
        .references("id")
        .inTable("custom_option");
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("order_custom_option_relation");
}
