"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionInfoService = void 0;
class PromotionInfoService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async getpromotionInfo(shopId) {
        try {
            let description = await this.knex
                .select("description")
                .from("shops")
                .where("shops.id", shopId);
            let images = await this.knex("shop_photos")
                .select("shop_photos.filename as filename", "shop_photos.cover_photo as isCover", "shop_photos.logo as isLogo")
                .join("shops", "shop_photos.shop_id", "=", "shops.id")
                .where("shops.id", shopId);
            console.log("Service--getpromotionInfo", { images, description });
            return { images, description };
        }
        catch (error) {
            console.error("An error occurred while fetching promotion info:", error);
            throw error;
        }
    }
    async postPromotionInfo(shopId, description, bannerUrl, logoUrl) {
        try {
            console.log("check serviceLogo", logoUrl);
            const checkDescription = await this.knex("shops")
                .select("description")
                .where("shops.id", shopId);
            if (checkDescription) {
                await this.knex
                    .update({
                    description: description,
                })
                    .into("shops")
                    .where("shops.id", shopId);
            }
            else {
                await this.knex
                    .insert({
                    description: description,
                })
                    .into("shops")
                    .where("shops.id", shopId);
            }
            const checklogo = await this.knex("shop_photos")
                .select("filename", "logo")
                .join("shops", "shop_photos.shop_id", "=", "shops.id")
                .where("shops.id", shopId)
                .andWhere("shop_photos.logo", true);
            if (checklogo) {
                await this.knex("shop_photos")
                    .update({
                    filename: logoUrl,
                })
                    .where("shop_photos.shop_id", shopId)
                    .where("shop_photos.logo", true);
            }
            else {
                await this.knex
                    .insert({
                    filename: bannerUrl,
                    cover_photo: true,
                    logo: false,
                    shop_id: shopId,
                })
                    .into("shop_photos");
            }
            const checkbanner = await this.knex("shop_photos")
                .select("filename", "cover_photo")
                .join("shops", "shop_photos.shop_id", "=", "shops.id")
                .where("shops.id", shopId)
                .andWhere("shop_photos.cover_photo", true);
            if (checkbanner) {
                await this.knex("shop_photos")
                    .update({
                    filename: bannerUrl,
                })
                    .where("shop_photos.shop_id", shopId)
                    .andWhere("shop_photos.cover_photo", true);
            }
            else {
                await this.knex
                    .insert({
                    filename: bannerUrl,
                    cover_photo: true,
                    logo: false,
                    shop_id: shopId,
                })
                    .into("shop_photos");
            }
            return {
                success: true,
                message: "Promotion information posted successfully",
            };
        }
        catch (error) {
            console.error("Error posting promotion information:", error);
            return {
                success: false,
                message: "Failed to post promotion information",
            };
        }
    }
}
exports.PromotionInfoService = PromotionInfoService;
