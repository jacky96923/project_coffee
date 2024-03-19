"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const hash_1 = require("../utils/hash");
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    // Inserts seed entries
    let users = [
        {
            email: "jacky96923@gmail.com",
            contact_no: "60254847",
            reward_points: "0",
            login_name: "Jacky",
            login_password: "1234",
        },
        {
            email: "ccbwork2019@gmail.com",
            contact_no: "66710996",
            reward_points: "0",
            login_name: "Brian",
            login_password: "1234",
        },
        {
            email: "pangkaho8@gmail.com",
            contact_no: "66002827",
            reward_points: "0",
            login_name: "Kenneth",
            login_password: "1234",
        },
        {
            email: "tom12771277@gmail.com",
            contact_no: "65873743",
            reward_points: "0",
            login_name: "Tom",
            login_password: "1234",
        },
    ];
    for (let entry of users) {
        await knex("users").insert({
            email: entry.email,
            contact_no: entry.contact_no,
            reward_points: entry.reward_points,
            login_name: entry.login_name,
            login_password: await (0, hash_1.hashPassword)(entry.login_password),
        });
    }
}
exports.seed = seed;
