import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("item_type_relation").del();

  // Inserts seed entries
  await knex("item_type_relation").insert([
    { item_id: 1, type_id: 1 },
    { item_id: 2, type_id: 2 },
    { item_id: 3, type_id: 2 },
    { item_id: 4, type_id: 2 },
    { item_id: 5, type_id: 2 },
    { item_id: 6, type_id: 2 },
    { item_id: 7, type_id: 2 },
    { item_id: 8, type_id: 2 },
    { item_id: 9, type_id: 4 },
    { item_id: 10, type_id: 5 },
    { item_id: 11, type_id: 6 },
    { item_id: 12, type_id: 6 },
    { item_id: 13, type_id: 9 },
    { item_id: 14, type_id: 9 },
    { item_id: 15, type_id: 9 },
    { item_id: 16, type_id: 9 },
    { item_id: 17, type_id: 9 },
    { item_id: 18, type_id: 9 },
    { item_id: 19, type_id: 9 },
    { item_id: 20, type_id: 9 },
    { item_id: 21, type_id: 9 },
    { item_id: 22, type_id: 10 },
    { item_id: 23, type_id: 10 },
    { item_id: 24, type_id: 11 },
  ]);
}
