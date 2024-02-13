import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users_favourite_shops_relation").del();

  // Inserts seed entries
  await knex("users_favourite_shops_relation").insert([
    { user_id: 1, shop_id: 1 },
    { user_id: 2, shop_id: 1 },
    { user_id: 3, shop_id: 1 },
    { user_id: 4, shop_id: 1 },
  ]);
}
