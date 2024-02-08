import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.increments().primary();
    table.string("email", 255).notNullable();
    table.string("contact_no", 64).notNullable();
    table.integer("reward_points");
    table.string("login_name", 64).notNullable();
    table.string("login_password", 64).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
