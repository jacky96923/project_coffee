import { Knex } from "knex";

export class MainService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex();
  }
  // ------------------------------------------------------------------------------

  async getMainInfo(shopId: number) {
    try {
      let result = await this.knex
        .distinct()
        .select(
          "shop_name",
          "contact_no",
          "area",
          "district",
          "address",
        )
        .from("shops")
        .where("shops.id", shopId)

      let description = await this.knex("shops")
      .select("description")
      .where("id", shopId)
      console.log("description", description[0].description)

      let coverPhoto = await this.knex("shop_photos")
      .select("filename")
      .where("shop_id", shopId)
      .where("shop_photos.cover_photo", true);
      console.log("coverPhoto", coverPhoto)

      result[0].description = description[0].description;
      if (coverPhoto.length > 0) {
        result[0].filename = coverPhoto[0].filename;
      }
      console.log("result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
