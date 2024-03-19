"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("comment", function (table) {
        table.increments().primary();
        table.integer("rating");
        table.text("description");
        table
            .integer("transaction_id")
            .unsigned()
            .references("id")
            .inTable("transaction");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
        console.log('This is my function');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("comment");
}
exports.down = down;
