import express, { Request, Response } from "express";
import { StripeService } from "../services/StripeService";
import bodyParser from "body-parser";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET || !process.env.STRIPE_ENDPOINT) {
    throw Error("you have to fill in STRIPE_SECRET and STRIPE_ENDPOINT .env file");
  }
  
const stripe = new Stripe(process.env.STRIPE_SECRET);
  
const endpointSecret = process.env.STRIPE_ENDPOINT;

export class StripeController {
  router = express.Router();
  public constructor(private stripeService: StripeService) {
    this.router.post("/webhook", bodyParser.raw({ type: "application/json" }), this.postWebhook);
  }

  postWebhook = async (req: Request, res: Response) => {
    const payload = req.body;

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucceeded = event.data.object;
          console.log(paymentIntentSucceeded.metadata);
            // await client.query(
            // `UPDATE transactions SET status = 'completed',stripe_id = '${paymentIntentSucceeded.id}' WHERE id = ${paymentIntentSucceeded.metadata.transaction_id}`
            // );
          this.stripeService.completeTransaction(paymentIntentSucceeded)

          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      res.status(200).end();
    } catch (err: any) {
      console.log(err);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  };
}