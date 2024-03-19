"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("item", function (table) {
        table.increments().primary();
        table.string("name", 255).notNullable;
        table.string("item_photo", 1000).notNullable;
        table.string("size", 60);
        table.float("price").notNullable;
        table.string("description", 255);
        table.boolean("is_enabled");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("item");
}
exports.down = down;
