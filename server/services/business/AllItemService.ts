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

  async changeItemStatus() {}
}
