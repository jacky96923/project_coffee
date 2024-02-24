import { Knex } from "knex";

export class DialogAddCategoryService {
  constructor(private knex: Knex) {}
  async postCatName(catName: string, shopId: number) {
    try {
      const menuId = (
        await this.knex("menu").select("id").where("shop_id", shopId)
      )[0];
      // console.log("menuId", menuId);

      const result: any = await this.knex("category")
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
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
