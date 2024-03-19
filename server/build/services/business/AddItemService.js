"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemService = void 0;
class AddItemService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async getItems(shopId, itemId) {
        try {
            let result = {
                itemName: "",
                itemPhoto: "",
                itemDescription: "",
                itemIdSizePrice: [],
                itemType: { itemTypeName: "", itemTypeId: NaN },
                itemOptionList: []
            };
            const name = await this.knex
                .select("name")
                .from("item")
                .where("id", itemId)
                .first();
            console.log("service name", name);
            result.itemName = name.name;
            const data1 = await this.knex("item")
                .select("item.item_photo as itemPhoto", "item.description as itemDescription")
                .select(this.knex.raw("JSON_AGG(JSON_BUILD_OBJECT('itemid', item.id, 'size', item.size, 'price', item.price)) as itemidsizeprice"))
                .where("item.name", name.name)
                .where("item.shop_id", shopId)
                .groupBy("item.item_photo")
                .groupBy("item.description");
            result.itemDescription = data1[0].itemDescription;
            result.itemPhoto = data1[0].itemPhoto;
            result.itemIdSizePrice = data1[0].itemidsizeprice;
            const data2 = await this.knex("item")
                .select("type.id as itemTypeId", "type.name as itemTypeName")
                .join("item_type_relation", "item_type_relation.item_id", "item.id")
                .join("type", "item_type_relation.type_id", "type.id")
                .where("item.name", name.name)
                .where("item.shop_id", shopId);
            result.itemType = data2[0];
            const data3 = await this.knex("type")
                .select("option_list.name as optionList")
                .select(this.knex.raw("JSON_AGG(JSON_BUILD_OBJECT('name', custom_option.name, 'price', custom_option.price)) as options"))
                .join("type_option_list_relation", "type_option_list_relation.type_id", "type.id")
                .join("option_list", "type_option_list_relation.option_list_id", "option_list.id")
                .join("custom_option", "option_list.custom_option_id", "custom_option.id")
                .groupBy("option_list.name")
                .where("type.id", result.itemType.itemTypeId)
                .where("custom_option.shop_id", shopId);
            result.itemOptionList = data3;
            return result;
        }
        catch (error) {
            console.log("addItemService", error);
        }
    }
    async getAllTypes(shopId) {
        try {
            const types = await this.knex("type")
                .select("type.id AS itemTypeId", "type.name AS itemTypeName")
                .leftJoin("type_option_list_relation", "type_option_list_relation.type_id", "type.id")
                .leftJoin("option_list", "option_list.id", "type_option_list_relation.option_list_id")
                .leftJoin("custom_option", "custom_option.id", "option_list.custom_option_id")
                .where("type.shop_id", shopId)
                .groupBy("type.id", "type.name")
                .select(this.knex.raw("json_agg(distinct option_list.name) AS itemoptionlist"));
            console.log("types", types);
            for (let entry of types) {
                let option_listResult = [];
                for (let optionListEntry of entry.itemoptionlist) {
                    let itemOptions = {};
                    const resultEntry = await this.knex("custom_option")
                        .distinct()
                        .select("custom_option.name as name", "custom_option.price as price")
                        .join("option_list", "option_list.custom_option_id", "custom_option.id")
                        .where("option_list.name", optionListEntry);
                    itemOptions.optionList = optionListEntry;
                    itemOptions.options = resultEntry;
                    option_listResult.push(itemOptions);
                }
                //console.log("option_listResult", option_listResult);
                entry.itemoptionlist = option_listResult;
                // Formatting data
                const itemType = { itemTypeName: entry.itemTypeName, itemTypeId: entry.itemTypeId };
                entry.itemType = itemType;
                delete entry.itemTypeName;
                delete entry.itemTypeId;
                const itemOptionList = entry.itemoptionlist;
                entry.itemOptionList = itemOptionList;
                delete entry.itemoptionlist;
            }
            //console.log("types before return", types);
            return types;
        }
        catch (error) {
            console.log("addItemService, getAllTypes", error);
        }
    }
    async addItemInfo(itemName, itemTypeId, itemSizePrice, description, photoUrl, shopId) {
        try {
            for (let entry of itemSizePrice) {
                const insertItem = await this.knex("item")
                    .insert({
                    name: itemName,
                    item_photo: photoUrl,
                    size: entry.size,
                    price: entry.price,
                    description: description,
                    is_enabled: true,
                    shop_id: shopId
                }).returning("id");
                await this.knex("item_type_relation")
                    .insert({ item_id: insertItem[0].id, type_id: itemTypeId });
            }
            return { msg: "insert new item succeed" };
        }
        catch (error) {
            return { error: error };
        }
    }
    async getAllOptionListWithOptions(shopId) {
        let result = await this.knex("option_list")
            .select("option_list.name as optionListName")
            .select(this.knex.raw("JSON_AGG(JSON_BUILD_OBJECT('name', custom_option.name, 'price', custom_option.price)) as options"))
            .join("custom_option", "option_list.custom_option_id", "custom_option.id")
            .groupBy("option_list.name")
            .where("option_list.shop_id", shopId);
        console.log("result in service", result);
        return result;
    }
}
exports.AddItemService = AddItemService;
