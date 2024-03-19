"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const moment_1 = __importDefault(require("moment"));
class OrderService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async getReceivedOrders(shopId) {
        const currentDate = (0, moment_1.default)().format("YYYY-MM-DD");
        let completedTransactionList = await this.knex
            .select("transaction.id as transactionId", "transaction.order_time as orderTime", "transaction.pickup_time as pickupTime", "transaction.pick_status as pickupStatus", "kitchen.transaction_done as doneStatus")
            .from("transaction")
            .join("kitchen", "transaction.id", "kitchen.transaction_id")
            .where("transaction.shop_id", shopId)
            .where("transaction.payment_status", "completed")
            .where("transaction.pick_status", false);
        //console.log("completedTransactionList in service", completedTransactionList)
        let result = [];
        for (let entry of completedTransactionList) {
            let transactionDate = (0, moment_1.default)(entry.orderTime).format("YYYY-MM-DD");
            if (transactionDate === currentDate) {
                let ordersInTransaction = await this.knex
                    .select("order_entry.id as orderId", "item.name as itemName", "item.size as itemSize", "order_entry.quantity as quantity", this.knex.raw("json_agg(custom_option.name order by custom_option.id) as options"))
                    .from("order_entry")
                    .join("order_detail", "order_entry.id", "order_detail.order_entry_id")
                    .join("item", "item.id", "order_detail.item_id")
                    .join("order_custom_option_relation", "order_detail.id", "order_custom_option_relation.order_detail_id")
                    .join("custom_option", "custom_option.id", "order_custom_option_relation.custom_option_id")
                    .where("order_entry.transaction_id", entry.transactionId)
                    .orderBy("order_entry.id")
                    .groupBy("order_entry.id")
                    .groupBy("item.name")
                    .groupBy("item.size");
                //console.log("ordersInTransaction in service", ordersInTransaction)
                entry.orders = ordersInTransaction;
                entry.orderTime = (0, moment_1.default)(entry.orderTime).format("HH:mm");
                entry.pickupTime = (0, moment_1.default)(entry.pickupTime).format("HH:mm");
                result.push(entry);
            }
        }
        return result;
    }
    async updateCompletedOrder(transactionId) {
        let result = await this.knex("kitchen")
            .update({ transaction_done: true })
            .where("kitchen.transaction_id", transactionId)
            .returning("id");
        //console.log("result in service", result)
        return result;
    }
    async updatePickupedOrder(transactionId) {
        let result = await this.knex("transaction")
            .update({ pick_status: true })
            .where("id", transactionId)
            .returning("id");
        console.log("result in service", result);
        return result;
    }
}
exports.OrderService = OrderService;
