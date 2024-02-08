import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("shops").del();

  // Inserts seed entries
  await knex("shops").insert([
    {
      shop_name: "木果咖啡",
      contact_no: "69696969",
      area: "九龍",
      district: "九龍灣",
      address: "宏光道1號億京中心地下",
      description: "#香港咖啡店 #精品咖啡館, nfcoffee.hk",
      login_name: "shop1",
      login_password: "shop1",
      latitude: 22.32173,
      longitude: 114.20611,
    },
    {
      shop_name: "太平洋咖啡",
      contact_no: "22612651",
      area: "九龍",
      district: "啟德",
      address: "啟德承昌道1號香港兒童醫院B座1樓部分",
      description:
        "我們於香港設有逾百間分店，每天為你用心沖調完美一杯，並自設中央廚房提供多款新鮮食品，部分店舖更設有獨特的設計主題或特色食品及飲品，讓你享受截然不同的咖啡體驗。",
      login_name: "shop2",
      login_password: "shop2",
      latitude: 22.31548,
      longitude: 114.20946,
    },
  ]);
}
