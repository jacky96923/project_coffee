"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("category_active_time", function (table) {
        table.increments().primary();
        table.string("day", 60);
        table.time("start_time");
        table.time("close_time");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("category_active_time");
}
exports.down = down;
