"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("transaction", function (table) {
        table.increments().primary();
        table.time("order_time").notNullable;
        table.time("pickup_time").notNullable;
        table.boolean("pick_status").notNullable;
        table.boolean("tagged");
        table.float("total").notNullable;
        table.integer("stripe_id");
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("transaction");
}
exports.down = down;
