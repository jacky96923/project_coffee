import { Knex } from "knex";

export class ItemPageService {
  constructor(private knex: Knex) {}
  async getItem(itemId: number) {
    let result = await this.knex
      .select("name")
      .from("item")
      .where("id", itemId);
    return result;
  }
  async getItemInfo(itemName: { name: string }[]) {
    let name = itemName[0].name;
    let itemInfo = await this.knex
      .select(
        "item.*",
        { shopName: "shops.shop_name" },
        { address: "shops.address" }
      )
      .from("item")
      .join("shops", "shops.id", "item.shop_id")
      .where("item.name", name);

    let optionList = await this.knex("item")
      .join("item_type_relation", "item.id", "=", "item_type_relation.item_id")
      .join("type", "type_id", "=", "type.id")
      .join(
        "type_option_list_relation",
        "type.id",
        "=",
        "type_option_list_relation.type_id"
      )
      .join(
        "option_list",
        "type_option_list_relation.option_list_id",
        "=",
        "option_list.id"
      )
      .distinct("option_list.name AS option_list_name")
      .where("item.name", "=", name)
      .select();

    //check if item is enabled
    const isEnabled = itemInfo.every((item) => item.is_enabled);
    if (!isEnabled) {
      return { flag: false, message: "Item is no longer available" };
    } else return { itemInfo, optionList };
  }

  async getInitalState(itemId: number) {
    let itemState = await this.knex("item")
      .select(
        "shops.id as shopId",
        "shops.shop_name as shopName",
        "shops.address as address",
        "item.id as id",
        "item.name as name",
        "item.item_photo as item_photo",
        "item.size as size",
        "item.price as price"
      )
      .join("shops", "shops.id", "=", "item.shop_id")
      .where("item.id", itemId);

    let optionState = await this.knex("item")
      .select("option_list.name as optionListName")
      .select(
        this.knex.raw(
          "json_agg(json_build_object('option_name', custom_option.name, 'price', custom_option.price)ORDER BY custom_option.id) as options"
        )
      )
      .join("item_type_relation", "item_type_relation.item_id", "=", "item.id")
      .join("type", "type.id", "=", "item_type_relation.type_id")
      .join(
        "type_option_list_relation",
        "type_option_list_relation.type_id",
        "=",
        "type.id"
      )
      .join(
        "option_list",
        "option_list.id",
        "=",
        "type_option_list_relation.option_list_id"
      )
      .join(
        "custom_option",
        "custom_option.id",
        "=",
        "option_list.custom_option_id"
      )
      .where("item.id", itemId)
      .groupBy("option_list.name");

    if (itemState && optionState) {
      return { itemState, optionState };
    } else {
      return { message: "Error getting optionsState" };
    }
  }
}
