"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogAddCategoryService = void 0;
class DialogAddCategoryService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async postCatName(catName, shopId) {
        try {
            const menuId = (await this.knex("menu").select("id").where("shop_id", shopId))[0];
            // console.log("menuId", menuId);
            const result = await this.knex("category")
                .insert({
                name: catName,
            })
                .returning("id");
            // console.log("category.id", result);
            await this.knex("menu_category_relation").insert({
                category_id: result[0].id,
                menu_id: menuId.id,
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.DialogAddCategoryService = DialogAddCategoryService;
