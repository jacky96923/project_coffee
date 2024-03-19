"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("menu").del();
    // Inserts seed entries
    await knex("menu").insert([
        {
            name: "木果餐單",
            last_update: "2024-01-01 00:00:00",
            photo: "https://static8.orstatic.com/userphoto2/photo/1W/1I9N/0APWOBDE22CF7E29EE0CB4px.jpg",
            shop_id: 1,
        },
        {
            name: "Pacific餐單",
            last_update: "2024-01-01 00:00:00",
            photo: "https://static6.orstatic.com/userphoto2/photo/11/TB1/05SELLC3CB28869B2A9F51px.jpg",
            shop_id: 2,
        },
    ]);
}
exports.seed = seed;
