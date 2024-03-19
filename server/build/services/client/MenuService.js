"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuIdService = void 0;
class MenuIdService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    table() {
        return this.knex("menu");
    }
    // ------------------------------------------------------------------------------
    async getCategoryId(shopId) {
        try {
            let result = await this.knex
                .select("menu_category_relation.category_id")
                .from("menu_category_relation")
                .join("menu", "menu.id", "menu_category_relation.menu_id")
                .join("shops", "shops.id", "menu.shop_id")
                .where("shops.id", shopId);
            // console.log("getCategoryId result", result);
            return result;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    // ------------------------------------------------------------------------------
    async getCategoryItem(categoryId) {
        try {
            // console.log("categoryId", categoryId);
            let categoryName = await this.knex
                .select("category.name")
                .from("category_active_time")
                .rightOuterJoin("category", "category_active_time_id", "category_active_time.id")
                .join("menu_category_relation", "category_id", "category.id")
                .where("category.id", categoryId);
            // console.log("categoryName result", categoryName);
            let itemsInformation = await this.knex
                .select("item.id", "item.name", "item.item_photo", "item.price", "item.description", "item.shop_id", "item.size")
                .from("category")
                .join("category_item_relation", "category_item_relation.category_id", "category.id")
                .join("item", "item.id", "category_item_relation.item_id")
                .where(function () {
                this.where("item.size", "小杯").orWhereNull("item.size");
            })
                .where("category.id", categoryId)
                .andWhereRaw("NOT EXISTS (SELECT 1 FROM item i2 WHERE i2.name = item.name AND i2.is_enabled = false AND i2.id != item.id)")
                .where("is_enabled", true);
            // console.log("itemsInformation", itemsInformation);
            return [categoryName, itemsInformation];
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    // ------------------------------------------------------------------------------
    async getShopInformation(shopId) {
        try {
            // console.log("shopId", shopId);
            let result = await this.knex("shops")
                .select("id", "shop_name", "address")
                .where("shops.id", shopId);
            // console.log("getShopInformation result", result);
            return result;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.MenuIdService = MenuIdService;
