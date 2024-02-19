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
            return false;
        }
    }
}