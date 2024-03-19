"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("set_item_relation").del();
    // Inserts seed entries
    await knex("set_item_relation").insert([
        {
            food_item_id: 11,
            drink_item_id: 2,
            drink_size: "中杯",
            extra_cost: 10,
            set_id: 1,
        },
        {
            food_item_id: 11,
            drink_item_id: 2,
            drink_size: "大杯",
            extra_cost: 20,
            set_id: 1,
        },
        {
            food_item_id: 11,
            drink_item_id: 5,
            drink_size: "中杯",
            extra_cost: 10,
            set_id: 1,
        },
        {
            food_item_id: 11,
            drink_item_id: 5,
            drink_size: "大杯",
            extra_cost: 20,
            set_id: 1,
        },
        {
            food_item_id: 24,
            drink_item_id: 13,
            drink_size: "中杯",
            extra_cost: 10,
            set_id: 2,
        },
        {
            food_item_id: 24,
            drink_item_id: 13,
            drink_size: "大杯",
            extra_cost: 20,
            set_id: 2,
        },
        {
            food_item_id: 24,
            drink_item_id: 16,
            drink_size: "中杯",
            extra_cost: 10,
            set_id: 2,
        },
        {
            food_item_id: 24,
            drink_item_id: 16,
            drink_size: "大杯",
            extra_cost: 20,
            set_id: 2,
        },
    ]);
}
exports.seed = seed;
