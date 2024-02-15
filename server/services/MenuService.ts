import { Knex } from "knex";

export class MenuIdService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("menu");
  }
  async getCategoryId(shopId: number) {
    try {
      let result = await this.knex
        .select("menu_category_relation.category_id")
        .from("menu_category_relation")
        .join("menu", "menu.id", "menu_category_relation.menu_id")
        .join("shops", "shops.id", "menu.shop_id")
        .where("shops.id", shopId);

      console.log("result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getCategoryName(categoryName: []) {
    try {
      let result = await this.knex
        .select("category.id")
        .from("category")
        .join("menu_category_relation", "category_id", "category.id")
        .where("category.name", categoryName);
      console.log("result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
