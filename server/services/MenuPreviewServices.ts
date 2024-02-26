import { Knex } from "knex";

export class MenuPreviewService {
  constructor(private knex: Knex) {}

  async getMenuPreview(shopId: number) {
    try {
      let categoryIdList = await this.knex
        .select("menu_category_relation.category_id")
        .from("menu_category_relation")
        .join("menu", "menu.id", "menu_category_relation.menu_id")
        .join("shops", "shops.id", "menu.shop_id")
        .where("shops.id", shopId);

      // console.log("categoryIdList", categoryIdList);

      let categoryNameIconList = [];
      for (let categoryId of categoryIdList) {
        let categoryName = await this.knex
          .select("category.id", "category.name", "category.icon")
          .from("category_active_time")
          .rightOuterJoin(
            "category",
            "category_active_time_id",
            "category_active_time.id"
          )
          .join("menu_category_relation", "category_id", "category.id")
          .where("category.id", categoryId.category_id);
        // console.log("categoryName", categoryName);

        categoryNameIconList.push(categoryName[0]);
      }
      // console.log("categoryNameIconList", categoryNameIconList);

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
        // console.log("itemsInformation", itemsInformation);

        itemList.push(itemsInformation);
      }
      // console.log("itemList", itemList);

      return [categoryNameIconList, itemList];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async putCatName(updateCatName: string, categoryId: number) {
    try {
      const result = await this.knex("category")
        .where("category.id", categoryId)
        .update({ name: updateCatName });
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteCatName(categoryId: number) {
    try {
      await this.knex.raw(
        "delete from menu_category_relation where category_id = ?",
        [categoryId]
      );
      await this.knex.raw(
        "delete from category_item_relation where category_id = ?",
        [categoryId]
      );
      const categorySetRelationIdList = await this.knex.raw(
        "select id from category_set_relation where category_id = ?",
        [categoryId]
      );
      if (categorySetRelationIdList) {
        await this.knex.raw(
          "delete from category_set_relation where category_id = ?",
          [categoryId]
        );
      }
      await this.knex.raw("delete from category where id = ?", [categoryId]);
      //   .del();
      // await this.knex("menu_category_relation")
      //   .where("menu_category_relation.category_id", categoryId)
      //   .del();
      // await this.knex("category").where("category.id", categoryId).del();

      return { message: "delete succeed" };
    } catch (error) {
      console.log(error);
      return { message: "delete failed" };
    }
  }
  async deleteItem(itemId: number, categoryId: number) {
    try {
      await this.knex.raw(
        "DELETE FROM category_item_relation WHERE item_id = ? AND category_id = ??",
        [itemId, categoryId]
      );
      return { message: "delete succeed" };
    } catch (error) {
      console.log(error);
      return { message: "delete failed" };
    }
  }

  async addItemToCat(itemId: number, categoryId: number) {
    try {
      // const catId = await this.knex("category")
      //   .select("id")
      //   .where("category.id", categoryId);

      // const iId = await this.knex("item").select("id").where("item.id", itemId);

      const result = await this.knex("category_item_relation").insert({
        category_id: categoryId,
        item_id: itemId,
      });
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
