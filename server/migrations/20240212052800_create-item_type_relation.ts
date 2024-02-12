import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("item_type_relation", function (table) {
    table.increments().primary();
    table.integer("item_id").unsigned().references("id").inTable("item");
    table.integer("type_id").unsigned().references("id").inTable("type");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("item_type_relation");
}
