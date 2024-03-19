"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable("transaction", (table) => {
        table.dropColumn("pickup_time");
        table.dropColumn("order_time");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable("transaction", (table) => {
        table.time("order_time");
        table.time("pickup_time");
    });
}
exports.down = down;
