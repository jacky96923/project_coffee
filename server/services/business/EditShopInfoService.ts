import { Knex } from "knex";

export class EditShopInfoService {
  constructor(private knex: Knex) {}

  async postEditShopInfo(
    shopId: number,
    area: string,
    district: string,
    address: string
  ) {
    try {
      await this.knex("shops")
        .update({
          area: area,
          district: district,
          address: address,
        })
        .where("shops.id", shopId);
    } catch (error) {
      console.log("EditShopError, fuck me", error);
    }
  }
}
