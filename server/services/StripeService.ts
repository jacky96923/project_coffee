import { Knex } from "knex";
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

    async createTransaction(user_id: number){
        try {
            let result = await this.knex("transaction").insert({user_id: user_id, payment_status: "in progress"}).returning("id")
            console.log("create transaction service with id", result)
            return result
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async createOrder(transaction_id: number, order: {item_id: number, subTotal: number, quantity: number}){
        try {
            let result = await this.knex("order").insert({transaction_id: transaction_id, item_id: order.item_id, sub_total: order.subTotal, quantity: order.quantity}).returning("id")
            console.log("create transaction service with id", result)

        } catch (error) {
            console.log(error);

        }
    }
}