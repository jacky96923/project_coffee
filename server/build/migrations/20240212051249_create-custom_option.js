"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("custom_option", function (table) {
        table.increments().primary();
        table.string("name", 255).notNullable;
        table.float("price");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("custom_option");
}
exports.down = down;
