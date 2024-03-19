"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionSlideService = void 0;
class OptionSlideService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async getOptions(itemId, option) {
        let result = await this.knex
            .select("custom_option.name as option_name", "custom_option.price as extra_cost")
            .from("item")
            .join("item_type_relation", "item.id", "item_type_relation.item_id")
            .join("type", "item_type_relation.type_id", "type.id")
            .join("type_option_list_relation", "type.id", "type_option_list_relation.type_id")
            .join("option_list", "type_option_list_relation.option_list_id", "option_list.id")
            .join("custom_option", "option_list.custom_option_id", "custom_option.id")
            .where("item.id", itemId)
            .where("option_list.name", option);
        return result;
    }
}
exports.OptionSlideService = OptionSlideService;