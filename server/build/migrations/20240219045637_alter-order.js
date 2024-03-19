"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable("order", (table) => {
        table.integer("quantity");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable("order", (table) => {
        table.dropColumn("quantity");
    });
}
exports.down = down;
