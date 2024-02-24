import express, { Request, Response } from "express";
import { OrderService } from "../../services/business/OrderService";
import { isLoggedIn } from "../../utils/guard";

export class OrderController {
    router = express.Router();
    public constructor(private orderService: OrderService) {
        this.router.get("/getReceivedOrders", isLoggedIn, this.getReceivedOrders);

    }

    getReceivedOrders = async (req: Request, res: Response) => {
        let shopId: number = req.body.user_id;
        console.log(typeof shopId, "shopId", shopId);
        try {
            let result = await this.orderService.getReceivedOrders(shopId);
            console.log("order controller result", result);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    };

}