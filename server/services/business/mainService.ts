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
          "description",
          "filename"
        )
        .from("shops")
        .join("shop_photos", "shop_id", "shops.id")
        .where("shops.id", shopId)
        .where("shop_photos.cover_photo", true);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
