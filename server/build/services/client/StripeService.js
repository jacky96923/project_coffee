"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const moment_1 = __importDefault(require("moment"));
class StripeService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async completeTransaction(paymentIntentSucceeded) {
        try {
            let result = await this.knex("transaction")
                .update({
                payment_status: "completed",
                stripe_id: paymentIntentSucceeded.id
            })
                .where("id", paymentIntentSucceeded.metadata.transaction_id);
            let kitchenResult = await this.knex("kitchen").insert({ transaction_done: false, transaction_id: paymentIntentSucceeded.metadata.transaction_id }).returning("id");
            console.log("create kitchen service with id", kitchenResult);
            console.log("result", result);
            return result;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async createTransaction(user_id, shop_id, pickupTime, total) {
        try {
            const currentDate = (0, moment_1.default)().format('YYYY-MM-DD');
            const pickupDateTime = `${currentDate} ${pickupTime}:00`;
            let transactionResult = await this.knex("transaction").insert({ user_id: user_id, shop_id: shop_id, payment_status: "in progress", order_time: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"), pickup_time: (0, moment_1.default)(pickupDateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'), pick_status: false, tagged: false, total: total }).returning("id");
            console.log("create transaction service with id", transactionResult);
            return transactionResult;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async createOrder(shop_id, transaction_id, order) {
        try {
            let orderEntry = await this.knex("order_entry").insert({ transaction_id: transaction_id, item_id: order.item_id, sub_total: order.subTotal, quantity: order.quantity }).returning("id");
            console.log("create order with id", orderEntry[0].id);
            let orderDetail = await this.knex("order_detail").insert({ order_entry_id: orderEntry[0].id, item_id: order.item_id }).returning("id");
            for (let entry of order.optionList) {
                let customOptionId = await this.knex("custom_option").select("id").where({ name: entry.option.option_name, price: entry.option.price, shop_id: shop_id });
                console.log("customOptionId", customOptionId);
                await this.knex("order_custom_option_relation").insert({ order_detail_id: orderDetail[0].id, custom_option_id: customOptionId[0].id });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.StripeService = StripeService;
