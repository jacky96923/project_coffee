import express, { Request, Response } from "express";
import { OrderService } from "../../services/business/OrderService";
import { isLoggedIn } from "../../utils/guard";

export class OrderController {
    router = express.Router();
    public constructor(private orderService: OrderService) {
        this.router.get("/getReceivedOrders", isLoggedIn, this.getReceivedOrders);
        this.router.put("/completeOrder/:transactionId", isLoggedIn, this.updateCompletedOrder)
        this.router.put("/pickupOrder/:transactionId", isLoggedIn, this.updatePickupedOrder)
    }

    getReceivedOrders = async (req: Request, res: Response) => {
        let shopId: number = req.body.user_id;
        console.log(typeof shopId, "shopId", shopId);
        try {
            let result = await this.orderService.getReceivedOrders(shopId);
            console.log("get order controller result", result);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    };

    updateCompletedOrder = async (req: Request, res: Response) => {
        let transactionId: number = Number(req.params.transactionId)
        console.log(typeof transactionId, "transactionId", transactionId);
        try {
            let result = await this.orderService.updateCompletedOrder(transactionId);
            //console.log("update completed order controller result", result);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    updatePickupedOrder = async (req: Request, res: Response) => {
        let transactionId: number = Number(req.params.transactionId)
        console.log(typeof transactionId, "transactionId", transactionId);
        try {
            let result = await this.orderService.updatePickupedOrder(transactionId);
            console.log("update pickuped order controller result", result);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

}