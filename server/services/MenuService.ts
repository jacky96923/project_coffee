import { Knex } from "knex";

export class MenuIdService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("menu");
  }
  // ------------------------------------------------------------------------------

  async getCategoryId(shopId: number) {
    try {
      let result = await this.knex
        .select("menu_category_relation.category_id")
        .from("menu_category_relation")
        .join("menu", "menu.id", "menu_category_relation.menu_id")
        .join("shops", "shops.id", "menu.shop_id")
        .where("shops.id", shopId);

      // console.log("getCategoryId result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // ------------------------------------------------------------------------------

  async getCategoryName(categoryId: number) {
    try {
      // console.log("categoryId", categoryId);

      let result = await this.knex
        .select("category.name")
        .from("category_active_time")
        .rightOuterJoin(
          "category",
          "category_active_time_id",
          "category_active_time.id"
        )
        .join("menu_category_relation", "category_id", "category.id")
        .where("category.id", categoryId);
      // console.log("getCategoryName result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // ------------------------------------------------------------------------------

  async getShopInformation(shopId: number) {
    try {
      // console.log("shopId", shopId);

      let result = await this.knex("shops")
        .select("id", "shop_name", "address")
        .where("shops.id", shopId);

      // console.log("getShopInformation result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // ------------------------------------------------------------------------------

  // async getItemsInformation(categoryId: number) {
  //   try {
  //     console.log("categoryId", categoryId);

  //     let result = await this.knex
  //       .select(
  //         "item.name",
  //         "item.item_photo",
  //         "item.price",
  //         "item.description",
  //         "item.shop_id"
  //       )
  //       .from("category")
  //       .join(
  //         "category_item_relation",
  //         "category_item_relation.category_id",
  //         "category.id"
  //       )
  //       .join("item", "item.id", "category_item_relation.item_id")
  //       .where("category.id", categoryId);

  //     console.log("getProductsInformation result", result);
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }
}
