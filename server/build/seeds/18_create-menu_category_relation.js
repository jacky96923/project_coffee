"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("menu_category_relation").del();
    // Inserts seed entries
    await knex("menu_category_relation").insert([
        { category_id: 1, menu_id: 1 },
        { category_id: 2, menu_id: 1 },
        { category_id: 3, menu_id: 1 },
        { category_id: 4, menu_id: 1 },
        { category_id: 5, menu_id: 1 },
        { category_id: 6, menu_id: 1 },
        { category_id: 7, menu_id: 1 },
        { category_id: 8, menu_id: 2 },
        { category_id: 9, menu_id: 2 },
        { category_id: 10, menu_id: 2 },
        { category_id: 11, menu_id: 2 },
        { category_id: 12, menu_id: 2 },
        { category_id: 13, menu_id: 2 },
        { category_id: 14, menu_id: 2 },
        { category_id: 15, menu_id: 2 },
        { category_id: 16, menu_id: 2 },
    ]);
}
exports.seed = seed;
