"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("category").del();
    // Inserts seed entries
    await knex("category").insert([
        { name: "經典之選", icon: null, category_active_time_id: null },
        { name: "茶類", icon: null, category_active_time_id: null },
        { name: "醒晨早餐", icon: null, category_active_time_id: 1 },
        { name: "醒晨早餐", icon: null, category_active_time_id: 2 },
        { name: "醒晨早餐", icon: null, category_active_time_id: 3 },
        { name: "醒晨早餐", icon: null, category_active_time_id: 4 },
        { name: "醒晨早餐", icon: null, category_active_time_id: 5 },
        { name: "夏日之選", icon: null, category_active_time_id: null },
        { name: "精選茶飲", icon: null, category_active_time_id: null },
        { name: "早晨之選", icon: null, category_active_time_id: 6 },
        { name: "早晨之選", icon: null, category_active_time_id: 7 },
        { name: "早晨之選", icon: null, category_active_time_id: 8 },
        { name: "早晨之選", icon: null, category_active_time_id: 9 },
        { name: "早晨之選", icon: null, category_active_time_id: 10 },
        { name: "早晨之選", icon: null, category_active_time_id: 11 },
        { name: "早晨之選", icon: null, category_active_time_id: 12 },
    ]);
}
exports.seed = seed;
