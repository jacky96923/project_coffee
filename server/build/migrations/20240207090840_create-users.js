"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users", function (table) {
        table.increments().primary();
        table.string("email", 255).notNullable();
        table.string("contact_no", 64).notNullable();
        table.integer("reward_points");
        table.string("login_name", 64).notNullable();
        table.string("login_password", 64).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("users");
}
exports.down = down;
