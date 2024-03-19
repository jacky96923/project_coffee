"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditShopInfoService = void 0;
class EditShopInfoService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async postEditShopInfo(shopId, area, district, address) {
        try {
            await this.knex("shops")
                .update({
                area: area,
                district: district,
                address: address,
            })
                .where("shops.id", shopId);
        }
        catch (error) {
            console.log("EditShopError, fuck me", error);
        }
    }
}
exports.EditShopInfoService = EditShopInfoService;
