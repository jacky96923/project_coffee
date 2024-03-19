"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("menu", function (table) {
        table.increments().primary();
        table.string("name", 255).notNullable;
        table.timestamp("last_update");
        table.string("photo", 255);
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("menu");
}
exports.down = down;
