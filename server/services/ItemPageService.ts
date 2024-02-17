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
    let itemInfo = await this.knex.select("*").from("item").where("name", name);
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
}
