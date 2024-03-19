"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const express_1 = __importDefault(require("express"));
const guard_1 = require("../../utils/guard");
class OrderController {
    orderService;
    router = express_1.default.Router();
    constructor(orderService) {
        this.orderService = orderService;
        this.router.get("/getReceivedOrders", guard_1.isLoggedIn, this.getReceivedOrders);
        this.router.put("/completeOrder/:transactionId", guard_1.isLoggedIn, this.updateCompletedOrder);
        this.router.put("/pickupOrder/:transactionId", guard_1.isLoggedIn, this.updatePickupedOrder);
    }
    getReceivedOrders = async (req, res) => {
        let shopId = req.body.user_id;
        console.log(typeof shopId, "shopId", shopId);
        try {
            let result = await this.orderService.getReceivedOrders(shopId);
            console.log("get order controller result", result);
            return res.json(result);
        }
        catch (error) {
            console.log(error);
        }
    };
    updateCompletedOrder = async (req, res) => {
        let transactionId = Number(req.params.transactionId);
        console.log(typeof transactionId, "transactionId", transactionId);
        try {
            let result = await this.orderService.updateCompletedOrder(transactionId);
            //console.log("update completed order controller result", result);
            return res.json(result);
        }
        catch (error) {
            console.log(error);
        }
    };
    updatePickupedOrder = async (req, res) => {
        let transactionId = Number(req.params.transactionId);
        console.log(typeof transactionId, "transactionId", transactionId);
        try {
            let result = await this.orderService.updatePickupedOrder(transactionId);
            console.log("update pickuped order controller result", result);
            return res.json(result);
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.OrderController = OrderController;
