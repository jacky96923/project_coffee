import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("shops", function (table) {
    table.string("email", 255);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("shops", function (table) {
    table.dropColumn("email");
  });
}
