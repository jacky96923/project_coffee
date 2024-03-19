"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("shops", function (table) {
        table.increments().primary();
        table.string("shop_name", 60).notNullable();
        table.string("contact_no", 60).notNullable();
        table.string("area", 60);
        table.string("district", 60);
        table.string("address", 255);
        table.string("description", 255);
        table.string("login_name", 60).notNullable();
        table.string("login_password", 60).notNullable();
        table.float("latitude", 8, 6);
        table.float("longitude", 9, 6);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("shops");
}
exports.down = down;