import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("shops").del();

  let shops = [
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
    {
      shop_name: "根rootcafe",
      contact_no: "6255 3428",
      area: "九龍",
      district: "啟德",
      address: "啟德沐泰街7號區 1 座地 下4號舖",
      description:
        "Walk in only Open hour : 1200 - 1600 , 1715 - 2100 (2015 last order) Open day : Mon - Sun",
      login_name: "shop3",
      login_password: "shop3",
      latitude: 22.32672,
      longitude: 114.19874,
    },
    {
      shop_name: "做乜咖啡",
      contact_no: "6255 3428",
      area: "九龍",
      district: "啟德",
      address: "啟德沐泰街7號區 1 座地 下4號舖",
      description:
        "歡迎大家大駕光臨，品嚐我地嘅作品 全都是我地用心製作 所有menu將會重新調整,價錢都會儘量平民價 做乜咖啡 是書院學生自負盈虧經營 請大家多多支持！",
      login_name: "shop4",
      login_password: "shop4",
      latitude: 22.3339,
      longitude: 114.18777,
    },
    {
      shop_name: "咖啡街角",
      contact_no: "8490 4308",
      area: "九龍",
      district: "佐敦",
      address: "佐敦柯士甸道83號柯士甸廣場8B舖",
      description:
        "Echoing to the name of the restaurant, this is a small but cozy restaurant that is perfect for the locals.",
      login_name: "shop5",
      login_password: "shop5",
      latitude: 22.30403,
      longitude: 114.17055,
    },
    {
      shop_name: "咖啡空間",
      contact_no: "8490 4308",
      area: "香港",
      district: "北角",
      address: "城市花園商場14座1樓95-96號舖, 233號 Electric Rd, North Point",
      description:
        "Coffee + Space - 一個共享咖啡與齊聚生活愛好者的平臺。 幾個熱愛咖啡的人, 通過採購咖啡生豆, 烘焙及沖調, 誠心為客人帶來精巧而細緻的體驗。",
      login_name: "shop6",
      login_password: "shop6",
      latitude: 22.29035,
      longitude: 114.19342,
    },
    {
      shop_name: "Coast Coffee",
      contact_no: "8490 4308",
      area: "香港",
      district: "銅鑼灣",
      address: "天后天后廟道17號地舖",
      description:
        "Coffee + Space - 一個共享咖啡與齊聚生活愛好者的平臺。 幾個熱愛咖啡的人, 通過採購咖啡生豆, 烘焙及沖調, 誠心為客人帶來精巧而細緻的體驗。",
      login_name: "shop7",
      login_password: "shop7",
      latitude: 22.28341,
      longitude: 114.19328,
    },
    {
      shop_name: "佛系飲啡",
      contact_no: "9291 6364",
      area: "香港",
      district: "銅鑼灣",
      address: "天后天后廟道17號地舖",
      description:
        "Coffee + Space - 一個共享咖啡與齊聚生活愛好者的平臺。 幾個熱愛咖啡的人, 通過採購咖啡生豆, 烘焙及沖調, 誠心為客人帶來精巧而細緻的體驗。",
      login_name: "shop8",
      login_password: "shop8",
      latitude: 22.28163,
      longitude: 114.18313,
    },
  ];

  // Inserts seed entries
  for (let entry of shops) {
    await knex("shops").insert({
      shop_name: entry.shop_name,
      contact_no: entry.contact_no,
      area: entry.area,
      district: entry.district,
      address: entry.address,
      description: entry.description,
      login_name: entry.login_name,
      login_password: await hashPassword(entry.login_password),
      latitude: entry.latitude,
      longitude: entry.longitude,
    });
  }
}
