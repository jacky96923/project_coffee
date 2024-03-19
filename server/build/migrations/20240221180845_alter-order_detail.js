"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable("order_detail", (table) => {
        table.renameColumn("order_id", "order_entry_id");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable("order_detail", (table) => {
        table.renameColumn("order_entry_id", "order_id");
    });
}
exports.down = down;
