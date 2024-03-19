"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable("shops", function (table) {
        table.string("email", 255);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable("shops", function (table) {
        table.dropColumn("email");
    });
}
exports.down = down;
