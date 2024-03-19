"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("type").del();
    // Inserts seed entries
    await knex("type").insert([
        { name: "濃縮咖啡", shop_id: 1 },
        { name: "牛奶咖啡", shop_id: 1 },
        { name: "沙冰類", shop_id: 1 },
        { name: "茶類", shop_id: 1 },
        { name: "無奶茶類", shop_id: 1 },
        { name: "食品類", shop_id: 1 }, //6
        { name: "濃縮咖啡", shop_id: 2 }, //7
        { name: "牛奶咖啡", shop_id: 2 },
        { name: "沙冰類", shop_id: 2 }, //9
        { name: "茶類", shop_id: 2 }, //
        { name: "食品類", shop_id: 2 },
    ]);
}
exports.seed = seed;
