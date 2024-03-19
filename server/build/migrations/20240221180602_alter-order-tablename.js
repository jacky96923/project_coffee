"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.renameTable("order", "order_entry");
}
exports.up = up;
async function down(knex) {
    return knex.schema.renameTable("order_entry", "order");
}
exports.down = down;
