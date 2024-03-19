"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("menu_category_relation", function (table) {
        table.increments().primary();
        table
            .integer("category_id")
            .unsigned()
            .references("id")
            .inTable("category");
        table.integer("menu_id").unsigned().references("id").inTable("menu");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("menu_category_relation");
}
exports.down = down;
