import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("option_list").del();

  // Inserts seed entries
  await knex("option_list").insert([
    { name: "數量(濃縮咖啡)", custom_option_id: 1, shop_id: 1 },
    { name: "數量(濃縮咖啡)", custom_option_id: 2, shop_id: 1 },
    { name: "凍或熱飲", custom_option_id: 3, shop_id: 1 },
    { name: "凍或熱飲", custom_option_id: 4, shop_id: 1 },
    { name: "咖啡豆", custom_option_id: 5, shop_id: 1 },
    { name: "咖啡豆", custom_option_id: 6, shop_id: 1 },
    { name: "咖啡豆", custom_option_id: 7, shop_id: 1 }, //7
    { name: "奶類", custom_option_id: 8, shop_id: 1 },
    { name: "奶類", custom_option_id: 9, shop_id: 1 },
    { name: "奶類", custom_option_id: 10, shop_id: 1 },
    { name: "奶類", custom_option_id: 11, shop_id: 1 }, //11
    { name: "甜度", custom_option_id: 12, shop_id: 1 },
    { name: "甜度", custom_option_id: 13, shop_id: 1 },
    { name: "甜度", custom_option_id: 14, shop_id: 1 }, //14
    { name: "奶油", custom_option_id: 15, shop_id: 1 },
    { name: "奶油", custom_option_id: 16, shop_id: 1 },
    { name: "奶油", custom_option_id: 17, shop_id: 1 }, //17
    { name: "湯力", custom_option_id: 18, shop_id: 1 },
    { name: "湯力", custom_option_id: 19, shop_id: 1 }, //19
    { name: "奶類", custom_option_id: 20, shop_id: 2 },
    { name: "奶類", custom_option_id: 21, shop_id: 2 },
    { name: "奶類", custom_option_id: 22, shop_id: 2 },
    { name: "奶類", custom_option_id: 23, shop_id: 2 }, //23
    { name: "奶油", custom_option_id: 24, shop_id: 2 },
    { name: "奶油", custom_option_id: 25, shop_id: 2 },
    { name: "奶油", custom_option_id: 26, shop_id: 2 }, //26
    { name: "甜度", custom_option_id: 27, shop_id: 2 },
    { name: "甜度", custom_option_id: 28, shop_id: 2 },
    { name: "甜度", custom_option_id: 29, shop_id: 2 }, //29
    { name: "咖啡豆", custom_option_id: 30, shop_id: 2 },
    { name: "咖啡豆", custom_option_id: 31, shop_id: 2 },
    { name: "咖啡豆", custom_option_id: 32, shop_id: 2 }, //32
    { name: "凍/熱飲", custom_option_id: 33, shop_id: 2 },
    { name: "凍/熱飲", custom_option_id: 34, shop_id: 2 },
  ]);
}
