"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable("transaction", (table) => {
        table.timestamp("pickup_time", { useTz: false }).notNullable();
        table.timestamp("order_time", { useTz: false }).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable("transaction", (table) => {
        table.dropColumn("pickup_time");
        table.dropColumn("order_time");
    });
}
exports.down = down;
