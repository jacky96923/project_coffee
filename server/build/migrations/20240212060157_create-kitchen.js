"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("kitchen", function (table) {
        table.increments().primary();
        table.boolean("transaction_done");
        table
            .integer("transaction_id")
            .unsigned()
            .references("id")
            .inTable("transaction");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("kitchen");
}
exports.down = down;
