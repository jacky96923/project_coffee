"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("category_item_relation", function (table) {
        table.increments().primary();
        table
            .integer("category_id")
            .unsigned()
            .references("id")
            .inTable("category");
        table.integer("item_id").unsigned().references("id").inTable("item");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("category_item_relation");
}
exports.down = down;
