import { Knex } from "knex";

export class ReceiptService {
  constructor(private knex: Knex) {}
  async getAllReceipts(userId: number) {
    let result = await this.knex
      .select(
        "transaction.id as transactionId",
        "transaction.order_time as orderTime",
        "shops.shop_name as shopName",
        "transaction.total as total",
        "transaction.pick_status as pickupStatus",
        "transaction.tagged as tagged"
      ).select(
        this.knex.raw(
            "json_agg(json_build_object('itemName', item.name, 'itemSize', item.size, 'itemQuantity', order_entry.quantity) ORDER BY order_entry.id) as order"
        )
      )
      .from("transaction")
      .join("order_entry", "transaction.id", "order_entry.transaction_id")
      .join("item", 'order_entry.item_id', "item.id")
      .join(
        "shops",
        "shops.id",
        "transaction.shop_id"
      )
      .where("transaction.user_id", userId)
      .groupBy("transaction.id")
      .groupBy("transaction.order_time")
      .groupBy("shops.shop_name")
      .groupBy("transaction.total")
      .groupBy("transaction.pick_status")
      .groupBy("transaction.tagged")
      .orderBy("transaction.id")
    console.log("result in service", result)
    return result;
  }
}
