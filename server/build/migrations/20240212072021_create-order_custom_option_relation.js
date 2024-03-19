"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("order_custom_option_relation", function (table) {
        table.increments().primary();
        table
            .integer("order_detail_id")
            .unsigned()
            .references("id")
            .inTable("order_detail");
        table
            .integer("custom_option_id")
            .unsigned()
            .references("id")
            .inTable("custom_option");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("order_custom_option_relation");
}
exports.down = down;
