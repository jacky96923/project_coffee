"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("set").del();
    // Inserts seed entries
    await knex("set").insert([
        { name: "咖啡+牛角酥組合", price: 40, shop_id: 1 },
        { name: "咖啡+雞肉烤卷組合", price: 70, shop_id: 2 },
    ]);
}
exports.seed = seed;
