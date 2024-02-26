import { Knex } from "knex";

export class AllItemService {
  constructor(private knex: Knex) {}

  async getAllItem(shopId: number) {
    try {
      let items = await this.knex("item")
        .select(
          this.knex.raw(
            "json_agg(json_build_object('itemId', item.id, 'itemName',item.name, 'itemPhoto', item.item_photo, 'size', item.size, 'price', item.price, 'status', item.is_enabled, 'type', TYPE.name))as item"
          )
        )
        .join(
          "item_type_relation",
          "item_type_relation.item_id",
          "=",
          "item.id"
        )
        .join("type", "type.id", "=", "item_type_relation.type_id")
        .where("item.shop_id", shopId)
        .groupBy("item.id")
        .orderBy("item.id");

      if (items) {
        return items;
      } else {
        return { message: "Error getting all items back fuck me in the asss" };
      }
    } catch (error) {
      return { message: "Error running query kill me please." };
    }
  }

  async changeItemStatus(checkedItemList: number[], shopId: number) {
    try {
      console.log("---changeItemStatus----service---", shopId);
      console.log("---changeItemStatus----service---", checkedItemList);

      let checkItemStatus = await this.knex("item")
        .select("*")
        .whereIn("id", checkedItemList)
        .where("is_enabled", true);

      if (checkItemStatus.length > 0) {
        await this.knex("item")
          .whereIn("id", checkedItemList)
          .update({ is_enabled: false });
        return { message: "items status changed to false" };
      } else {
        await this.knex("item")
          .whereIn("id", checkedItemList)
          .update({ is_enabled: true });
        return { message: "items status changed to true" };
      }
    } catch (error) {
      console.log("Error running changeItemStatus query", error);
      return {
        message: "Error running changeItemStatus query kill me please.",
      };
    }
  }
}
