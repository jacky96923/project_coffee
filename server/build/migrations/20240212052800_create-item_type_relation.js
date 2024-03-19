"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("item_type_relation", function (table) {
        table.increments().primary();
        table.integer("item_id").unsigned().references("id").inTable("item");
        table.integer("type_id").unsigned().references("id").inTable("type");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("item_type_relation");
}
exports.down = down;
