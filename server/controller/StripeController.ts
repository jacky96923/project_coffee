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
    this.router.post("/create-checkout-session", this.getCheckout)
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

  getCheckout = async(req: Request, res: Response) => {
    // req.body should contain 
    // 1. details of all orders stored in an array
    // 2. userid --- should check whether there is a valid token before sending request
    console.log("check req.body", req.body);
    let {user_id, cart} = req.body
    
    let createTransactionResult: any = await this.stripeService.createTransaction(user_id)
  
    let transaction_id = createTransactionResult[0].id;
    console.log("check transaction_id", transaction_id);

    let line_items = [];
  
    for (let entry of cart) {
      await this.stripeService.createOrder(transaction_id, entry)
  
      let item = {
        price_data: {
          currency: "hkd",
          product_data: {
            name: entry.name,
            // optionList: entry.optionList
          },
          unit_amount: entry.subTotal/entry.quantity * 100,
        },
        quantity: entry.quantity,
      };
  
      line_items.push(item);
    }
  
    console.log("check line items", line_items);
  
    const metadata = {
      transaction_id: transaction_id,
    };
  
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `http://localhost:3000/receipt/temp`, // port need to take care
      cancel_url: `http://localhost:3000/shopping-cart`, // port need to take care 
      payment_intent_data: {
        metadata: metadata,
      },
    });
  
    if (session.url) res.json({ url: session.url });
    else res.json({ url: "http://localhost:3000/shopping-cart" });
  }
}