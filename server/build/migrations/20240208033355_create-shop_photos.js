"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("shop_photos", function (table) {
        table.increments().primary();
        table.string("filename", 1000);
        table.boolean("cover_photo");
        table.boolean("logo");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("shop_photos");
}
exports.down = down;
