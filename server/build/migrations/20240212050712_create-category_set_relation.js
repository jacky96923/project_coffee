"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("category_set_relation", function (table) {
        table.increments().primary();
        table
            .integer("category_id")
            .unsigned()
            .references("id")
            .inTable("category");
        table.integer("set_id").unsigned().references("id").inTable("set");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("category_set_relation");
}
exports.down = down;
