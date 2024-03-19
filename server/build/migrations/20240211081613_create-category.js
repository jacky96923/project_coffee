"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("category", function (table) {
        table.increments().primary();
        table.string("name", 255).notNullable;
        table.string("icon", 255);
        table
            .integer("category_active_time_id")
            .unsigned()
            .references("id")
            .inTable("category_active_time");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("category");
}
exports.down = down;
