"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("type_option_list_relation", function (table) {
        table.increments().primary();
        table.integer("type_id").unsigned().references("id").inTable("type");
        table
            .integer("option_list_id")
            .unsigned()
            .references("id")
            .inTable("option_list");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("type_option_list_relation");
}
exports.down = down;
