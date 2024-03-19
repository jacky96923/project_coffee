"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("order", function (table) {
        table.increments().primary();
        table.integer("item_id").unsigned().references("id").inTable("item");
        table.integer("set_id").unsigned().references("id").inTable("set");
        table
            .integer("transaction_id")
            .unsigned()
            .references("id")
            .inTable("transaction");
        table.integer("sub_total").notNullable;
        table.time("created_at").notNullable;
        table.time("updated_at").notNullable;
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("order");
}
exports.down = down;
