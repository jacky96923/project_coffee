"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("option_list", function (table) {
        table.increments().primary();
        table.string("name", 60);
        table
            .integer("custom_option_id")
            .unsigned()
            .references("id")
            .inTable("custom_option");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("option_list");
}
exports.down = down;
