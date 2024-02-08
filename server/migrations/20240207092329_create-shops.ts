import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("shops", function (table) {
    table.increments().primary();
    table.string("contact_no", 60).notNullable();
    table.string("area", 60).notNullable();
    table.string("district", 60).notNullable();
    table.string("address", 255).notNullable();
    table.string("description", 255);
    table.string("login_name", 60).notNullable();
    table.string("login_password", 60).notNullable();
    table.float("latitude", 8, 6).notNullable;
    table.float("longitude", 9, 6).notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("shops");
}
