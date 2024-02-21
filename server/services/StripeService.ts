import { Knex } from "knex";
import moment from "moment";
import Stripe from "stripe";

export class StripeService {
    constructor(private knex: Knex) { }

    async completeTransaction(paymentIntentSucceeded: Stripe.PaymentIntent) {
        try {
            let result = await this.knex("transaction")
            .update({
                payment_status: "completed",
                stripe_id: paymentIntentSucceeded.id})
            .where("id",
                paymentIntentSucceeded.metadata.transaction_id)

            console.log("result", result);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async createTransaction(user_id: number, shop_id: number, pickupTime: string, total: number){
        try {
            const currentDate = moment().format('YYYY-MM-DD');
            const pickupDateTime = `${currentDate} ${pickupTime}:00`;
            let result = await this.knex("transaction").insert({user_id: user_id, shop_id: shop_id, payment_status: "in progress", order_time: moment().format("YYYY-MM-DD HH:mm:ss"), pickup_time: moment(pickupDateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'), pick_status: false, tagged: false, total: total}).returning("id")
            console.log("create transaction service with id", result)
            return result
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async createOrder(shop_id: number, transaction_id: number, order: {item_id: number, optionList: any,subTotal: number, quantity: number}){
        try {
            let orderEntry = await this.knex("order").insert({transaction_id: transaction_id, item_id: order.item_id, sub_total: order.subTotal, quantity: order.quantity}).returning("id")
            console.log("create order with id", orderEntry[0].id)
            let orderDetail = await this.knex("order_detail").insert({order_id: orderEntry[0].id, item_id: order.item_id}).returning("id")
            for (let entry of order.optionList){
                let customOptionId = await this.knex("custom_option").select("id").where({name: entry.option.option_name, price: entry.option.price, shop_id: shop_id})
                console.log("customOptionId", customOptionId)
                await this.knex("order_custom_option_relation").insert({order_detail_id: orderDetail[0].id, custom_option_id: customOptionId[0].id})
            }
        } catch (error) {
            console.log(error);

        }
    }
}