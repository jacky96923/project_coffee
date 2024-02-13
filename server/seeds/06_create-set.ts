import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("set").del();

  // Inserts seed entries
  await knex("set").insert([
    { name: "咖啡+牛角酥組合", price: 40, shop_id: 1 },
    { name: "咖啡+雞肉烤卷組合", price: 70, shop_id: 2 },
  ]);
}
