"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("order_detail", function (table) {
        table.increments().primary();
        table.integer("order_id").unsigned().references("id").inTable("order");
        table.integer("item_id").unsigned().references("id").inTable("item");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("order_detail");
}
exports.down = down;
