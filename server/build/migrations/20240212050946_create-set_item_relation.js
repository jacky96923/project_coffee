"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("set_item_relation", function (table) {
        table.increments().primary();
        table.integer("food_item_id").unsigned().references("id").inTable("item");
        table.integer("drink_item_id").unsigned().references("id").inTable("item");
        table.string("drink_size", 255);
        table.float("extra_cost");
        table.integer("set_id").unsigned().references("id").inTable("set");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("set_item_relation");
}
exports.down = down;
