import { Knex } from "knex";

export class ShopService {
  constructor(private knex: Knex) {}
  table() {
    return this.knex("shops");
  }
  async getItem() {
    try {
      let result = await this.table().select("id", "shop_name", "address");

      console.log("result", result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
