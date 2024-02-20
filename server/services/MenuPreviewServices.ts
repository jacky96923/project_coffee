import { Knex } from "knex";

export class MenuPreviewService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("menuPreview");
  }
  async getMenuPreview(shopId: number) {
    try {
      let categoryIdList = await this.knex
        .select("menu_category_relation.category_id")
        .from("menu_category_relation")
        .join("menu", "menu.id", "menu_category_relation.menu_id")
        .join("shops", "shops.id", "menu.shop_id")
        .where("shops.id", shopId);

      //   console.log("categoryIdList", categoryIdList);

      let categoryNameList = [];
      for (let categoryId of categoryIdList) {
        let categoryName = await this.knex
          .select("category.name", "category.icon")
          .from("category_active_time")
          .rightOuterJoin(
            "category",
            "category_active_time_id",
            "category_active_time.id"
          )
          .join("menu_category_relation", "category_id", "category.id")
          .where("category.id", categoryId.category_id);
        // console.log("categoryName", categoryName);

        categoryNameList.push(categoryName);
      }

      let itemList = [];
      for (let categoryId of categoryIdList) {
        let itemsInformation = await this.knex
          .select(
            "item.id",
            "item.name",
            "item.item_photo",
            "item.price",
            "item.description",
            "item.shop_id",
            "item.size"
          )
          .from("category")
          .join(
            "category_item_relation",
            "category_item_relation.category_id",
            "category.id"
          )
          .join("item", "item.id", "category_item_relation.item_id")
          .where(function () {
            this.where("item.size", "小杯").orWhereNull("item.size");
          })
          .where("category.id", categoryId.category_id);
        console.log("itemsInformation", itemsInformation);

        itemList.push(itemsInformation);
      }

      return [categoryIdList, categoryNameList, itemList];
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
