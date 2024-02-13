import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("custom_option").del();

  // Inserts seed entries
  await knex("custom_option").insert([
    { name: "Single", price: null, shop_id: 1 },
    { name: "Double", price: 5, shop_id: 1 },
    { name: "凍飲", price: null, shop_id: 1 },
    { name: "熱飲", price: null, shop_id: 1 },
    { name: "預設咖啡豆", price: null, shop_id: 1 },
    { name: "低因咖啡豆", price: null, shop_id: 1 },
    { name: "特選咖啡豆", price: 10, shop_id: 1 },
    { name: "全脂奶", price: null, shop_id: 1 },
    { name: "脱脂奶", price: null, shop_id: 1 },
    { name: "豆奶", price: null, shop_id: 1 },
    { name: "燕麥奶", price: 5, shop_id: 1 },
    { name: "少糖", price: null, shop_id: 1 },
    { name: "正常糖", price: null, shop_id: 1 },
    { name: "多糖", price: null, shop_id: 1 },
    { name: "不加奶油", price: null, shop_id: 1 },
    { name: "半份奶油", price: null, shop_id: 1 },
    { name: "正常奶油", price: null, shop_id: 1 },
    { name: "半份湯力", price: null, shop_id: 1 },
    { name: "正常湯力", price: null, shop_id: 1 },
    { name: "全脂奶", price: null, shop_id: 2 }, //20
    { name: "脱脂奶", price: null, shop_id: 2 },
    { name: "豆奶", price: null, shop_id: 2 },
    { name: "燕麥奶", price: 5, shop_id: 2 },
    { name: "不加奶油", price: null, shop_id: 2 },
    { name: "半份奶油", price: null, shop_id: 2 },
    { name: "正常奶油", price: null, shop_id: 2 },
    { name: "少糖", price: null, shop_id: 2 },
    { name: "正常糖", price: null, shop_id: 2 },
    { name: "多糖", price: null, shop_id: 2 }, //29
    { name: "預設咖啡豆", price: null, shop_id: 2 },
    { name: "低因咖啡豆", price: null, shop_id: 2 },
    { name: "特選咖啡豆", price: 10, shop_id: 2 },
    { name: "凍飲", price: null, shop_id: 2 },
    { name: "熱飲", price: null, shop_id: 2 },
  ]);
}
