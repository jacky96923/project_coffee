import { Knex } from "knex";

export class AddItemService {
  constructor(private knex: Knex) {}

  async getItems(shopId: number, itemId: number) {
    try {
      const name = await this.knex
        .select("name")
        .from("item")
        .where("id", itemId)
        .first();

      console.log("service name", name);

      const query = `
        SELECT
          itemName,
          itemPhoto,
          itemDescription,
          array_agg(distinct 'size:' || itemSize || ',price:' || itemPrice) as itemSizePrice,
          array_agg(distinct 'itemTypeName:' || typeName || ',itemTypeId:' || typeId) AS itemType,
          json_object_agg(option_list_name, option_names) AS optionList
        FROM (
          SELECT
            item.name AS itemName,
            item.item_photo AS itemPhoto,
            item.description as itemDescription,
            item.size AS itemSize,
            item.price AS itemPrice,
            type.name AS typeName,
            type.id AS typeId,
            option_list.name AS option_list_name,
            array_agg(DISTINCT custom_option.name) AS option_names
          FROM
            item
            JOIN item_type_relation ON item_id = item.id
            JOIN type ON type_id = type.id
            JOIN type_option_list_relation ON type_option_list_relation.type_id = type.id
            JOIN option_list ON option_list.id = type_option_list_relation.option_list_id
            JOIN custom_option ON custom_option.id = option_list.custom_option_id
          WHERE
            item.name = :itemName
      
          GROUP BY
            item.name,
            item.item_photo,
            item.description,
            item.size,
            item.price,
            type.name,
            type.id,
            option_list.name
        ) AS subquery
        GROUP BY
          itemName,
          itemPhoto,
          itemDescription,
          itemPrice,
          itemSize;
      `;
      const bindings = {
        itemName: name.name,
      };

      const result = await this.knex.raw(query, bindings);
      return result.rows;
    } catch (error) {
      console.log("addItemService", error);
    }
  }

  async getAllTypes(shopId: number) {
    try {
      const types = await this.knex("type")
        .select("type.id AS itemTypeId", "type.name AS typeName")
        .leftJoin(
          "type_option_list_relation",
          "type_option_list_relation.type_id",
          "type.id"
        )
        .leftJoin(
          "option_list",
          "option_list.id",
          "type_option_list_relation.option_list_id"
        )
        .leftJoin(
          "custom_option",
          "custom_option.id",
          "option_list.custom_option_id"
        )
        .where("type.shop_id", shopId)
        .groupBy("type.id", "type.name")
        .select(
          this.knex.raw("json_agg(distinct option_list.name) AS itemoptionlist")
        );
      console.log("types", types);
      for (let entry of types) {
        let option_listResult: any = [];
        for (let optionListEntry of entry.itemoptionlist) {
          let itemOptions: any = {};
          const resultEntry = await this.knex("custom_option")
            .distinct()
            .select(
              "custom_option.name as optionName",
              "custom_option.price as optionPrice"
            )
            .join(
              "option_list",
              "option_list.custom_option_id",
              "custom_option.id"
            )
            .where("option_list.name", optionListEntry);
          itemOptions.optionList = optionListEntry;
          itemOptions.options = resultEntry;
          option_listResult.push(itemOptions);
        }
        console.log("option_listResult", option_listResult);
        entry.itemoptionlist = option_listResult;
      }
      console.log("types before return", types);
      return types;
    } catch (error) {
      console.log("addItemService, getAllTypes", error);
    }
  }
}
