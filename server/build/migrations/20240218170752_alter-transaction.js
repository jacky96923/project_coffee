"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable("transaction", (table) => {
        table.string("payment_status");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable("transaction", (table) => {
        table.dropColumn("payment_status");
    });
}
exports.down = down;
