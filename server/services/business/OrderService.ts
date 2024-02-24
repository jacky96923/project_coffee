import { Knex } from "knex";
import moment from "moment";

export class OrderService {
    constructor(private knex: Knex) {}
    async getReceivedOrders(shopId: number){
        const currentDate = moment().format("YYYY-MM-DD")
        let completedTransactionList = await this.knex
        .select(
            "transaction.id as transactionId",
            "transaction.order_time as orderTime",
            "transaction.pickup_time as pickupTime",
            "transaction.pick_status as pickupStatus",
            "kitchen.transaction_done as doneStatus"
        )
        .from("transaction")
        .join("kitchen", "transaction.id", "kitchen.transaction_id")
        .where("transaction.shop_id", shopId)
        .where("transaction.payment_status", "completed")

        console.log("completedTransactionList in service", completedTransactionList)
        
        let result = []
        for (let entry of completedTransactionList){
            let transactionDate = moment(entry.orderTime).format("YYYY-MM-DD")
            if (transactionDate === currentDate){
                let ordersInTransaction = await this.knex
                .select(
                    "order_entry.id as orderId",
                    "item.name as itemName",
                    "item.size as itemSize",
                    this.knex.raw(
                        "json_agg(custom_option.name order by custom_option.id) as options"
                    )
                    )
                .from("order_entry")
                .join("order_detail", "order_entry.id", "order_detail.order_entry_id")
                .join("item", "item.id", "order_detail.item_id")
                .join("order_custom_option_relation", "order_detail.id", "order_custom_option_relation.order_detail_id")
                .join("custom_option", "custom_option.id", "order_custom_option_relation.custom_option_id")
                .where("order_entry.transaction_id", entry.transactionId)
                .orderBy("order_entry.id")
                .groupBy("order_entry.id")
                .groupBy("item.name")
                .groupBy("item.size")
    
                console.log("ordersInTransaction in service", ordersInTransaction)
                entry.orders = ordersInTransaction
                entry.orderTime = moment(entry.orderTime).format("HH:mm")
                entry.pickupTime = moment(entry.pickupTime).format("HH:mm")
                result.push(entry)
            }
        }

        return result
    }
}