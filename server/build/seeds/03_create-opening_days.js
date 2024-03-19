"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("opening_days").del();
    // Inserts seed entries
    await knex("opening_days").insert([
        {
            day: "Monday",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "Tuesday",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "Wedsday",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "Thursday",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "Friday",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "Saturday",
            start_time: "10:00:00",
            close_time: "16:00:00",
            shop_id: 1,
        },
        {
            day: "Sunday",
            start_time: "10:00:00",
            close_time: "16:00:00",
            shop_id: 1,
        },
        {
            day: "2024-03-29 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-03-30 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-03-31 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-04-01 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-04-04 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-05-01 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-05-15 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-06-10 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-07-01 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-09-18 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-10-01 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-10-11 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-12-25 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "2024-12-26 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 1,
        },
        {
            day: "Monday",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "Tuesday",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "Wedsday",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "Thursday",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "Friday",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "Saturday",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "Sunday",
            start_time: "09:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-01-01 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-02-13 00:00:00",
            start_time: "08:00:00",
            close_time: "18:00:00",
            shop_id: 2,
        },
        {
            day: "2024-03-29 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-03-30 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-03-31 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-04-01 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-04-04 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-05-01 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-05-15 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-06-10 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-07-01 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-09-18 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-10-01 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-10-11 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-12-25 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
        {
            day: "2024-12-26 00:00:00",
            start_time: "07:30:00",
            close_time: "22:00:00",
            shop_id: 2,
        },
    ]);
}
exports.seed = seed;
