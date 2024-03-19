"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptService = void 0;
const moment_1 = __importDefault(require("moment"));
class ReceiptService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async getAllReceipts(userId) {
        let result = await this.knex
            .distinct()
            .select("transaction.id as transactionId", "transaction.order_time as orderTime", "shops.shop_name as shopName", "transaction.total as total", "transaction.pick_status as pickupStatus")
            .from("transaction")
            .join("order_entry", "transaction.id", "order_entry.transaction_id")
            .join("item", 'order_entry.item_id', "item.id")
            .join("shops", "shops.id", "transaction.shop_id")
            .where("transaction.user_id", userId)
            .where("transaction.payment_status", "completed")
            .orderBy("transaction.id", "desc");
        console.log("result(no comment) in service", result);
        let resultWithCommented = [];
        for (let entry of result) {
            const commentId = await this.knex.select("id")
                .from("comment")
                .where("transaction_id", entry.transactionId);
            if (commentId.length > 0) {
                entry.commented = true;
            }
            else {
                entry.commented = false;
            }
            resultWithCommented.push(entry);
        }
        //console.log("result with comment in service", resultWithCommented)
        let dateReceiptsList = [];
        for (let entry of resultWithCommented) {
            const date = (0, moment_1.default)(entry.orderTime).format("YYYY-MM-DD");
            const time = (0, moment_1.default)(entry.orderTime).format("HH:mm");
            const dateReceiptsObj = dateReceiptsList.find((dateReceipts) => dateReceipts.date === date);
            if (!dateReceiptsObj) {
                entry.orderTime = time;
                const firstReceipt = entry;
                let receipts = [firstReceipt];
                dateReceiptsList.push({ date: date, receipts: receipts });
            }
            else {
                const dateReceiptsObjIdx = dateReceiptsList.findIndex((dateReceipts) => dateReceipts.date === date);
                entry.orderTime = time;
                dateReceiptsList[dateReceiptsObjIdx].receipts.push(entry);
            }
        }
        return dateReceiptsList;
    }
    async getReceipt(transactionId) {
        let result = (await this.knex("transaction")
            .select("shops.id as shopId", "shops.shop_name as shopName", "shops.address as shopAddress", "transaction.order_time as orderTime", "transaction.pickup_time as pickupTime", "transaction.pick_status as pickupStatus", "transaction.total as total")
            .join("shops", "transaction.shop_id", "shops.id")
            .where("transaction.id", transactionId))[0];
        if (result) {
            const commentId = await this.knex.select("id")
                .from("comment")
                .where("transaction_id", transactionId);
            if (commentId.length > 0) {
                result.commented = true;
            }
            else {
                result.commented = false;
            }
            console.log("result with comment in service", result);
            result.orderTime = (0, moment_1.default)(result.orderTime).format("HH:mm");
            result.pickupTime = (0, moment_1.default)(result.pickupTime).format("HH:mm");
            return result;
        }
    }
    async getOrderDetails(transactionId) {
        let result = await this.knex("order_entry")
            .select("item.name as itemName", "item.size as itemSize", "order_entry.sub_total as subTotal", "order_entry.quantity as quantity")
            .select(this.knex.raw("JSON_AGG(custom_option.name) as chosenOptionList"))
            .join("order_detail", "order_entry.id", "order_detail.order_entry_id")
            .join("order_custom_option_relation", "order_detail.id", "order_custom_option_relation.order_detail_id")
            .join("custom_option", "custom_option.id", "order_custom_option_relation.custom_option_id")
            .join("item", "item.id", "order_detail.item_id")
            .groupBy("item.name")
            .groupBy("item.size")
            .groupBy("order_entry.sub_total")
            .groupBy("order_entry.quantity")
            .where("order_entry.transaction_id", transactionId);
        return result;
    }
}
exports.ReceiptService = ReceiptService;
