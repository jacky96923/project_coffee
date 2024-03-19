"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users_favourite_shops_relation", function (table) {
        table.increments().primary();
        table.integer("user_id").unsigned().references("id").inTable("users");
        table.integer("shop_id").unsigned().references("id").inTable("shops");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("users_favourite_shops_relation");
}
exports.down = down;
