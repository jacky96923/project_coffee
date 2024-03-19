"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("opening_days", function (table) {
        table.increments().primary();
        table.string("day", 60);
        table.time("start_time");
        table.time("close_time");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("opening_days");
}
exports.down = down;
