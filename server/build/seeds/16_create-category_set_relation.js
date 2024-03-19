"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("category_set_relation").del();
    // Inserts seed entries
    await knex("category_set_relation").insert([
        { category_id: 3, set_id: 1 },
        { category_id: 4, set_id: 1 },
        { category_id: 5, set_id: 1 },
        { category_id: 6, set_id: 1 },
        { category_id: 7, set_id: 1 },
        { category_id: 10, set_id: 2 },
        { category_id: 11, set_id: 2 },
        { category_id: 12, set_id: 2 },
        { category_id: 13, set_id: 2 },
        { category_id: 14, set_id: 2 },
        { category_id: 15, set_id: 2 },
        { category_id: 16, set_id: 2 },
    ]);
}
exports.seed = seed;
