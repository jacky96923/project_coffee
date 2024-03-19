"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopService = void 0;
class ShopService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    table() {
        return this.knex("shops");
    }
    async getItem() {
        try {
            let result = await this.knex
                .select("shops.id", "shops.shop_name", "shops.address", "shops.latitude", "shops.longitude")
                .select(this.knex.raw("json_agg(json_build_object('shopPhoto', shop_photos.filename, 'isCover', shop_photos.cover_photo)) as images"))
                .from("shops")
                .join("shop_photos", "shop_photos.shop_id", "shops.id")
                .groupBy("shops.id")
                .orderBy("shops.id", "asc");
            console.log("result", result);
            return result;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.ShopService = ShopService;
