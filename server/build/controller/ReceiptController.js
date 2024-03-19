"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptController = void 0;
const express_1 = __importDefault(require("express"));
class ReceiptController {
    receiptService;
    router = express_1.default.Router();
    constructor(receiptService) {
        this.receiptService = receiptService;
        this.router.get("/allReceipts/:userId", this.getAllReceipts);
        this.router.get("/:transactionId", this.getReceipt);
    }
    getAllReceipts = async (req, res) => {
        const userId = Number(req.params.userId);
        try {
            let allReceipts = await this.receiptService.getAllReceipts(userId);
            //console.log("allReceipts", allReceipts)
            return res.json(allReceipts);
        }
        catch (error) {
            console.log("AllReceipt Error", error);
        }
    };
    getReceipt = async (req, res) => {
        const transactionId = Number(req.params.transactionId);
        try {
            let receipt = await this.receiptService.getReceipt(transactionId);
            let orderDetails = await this.receiptService.getOrderDetails(transactionId);
            if (receipt && orderDetails) {
                // res.json({receipt, orderDetails}) does not work
                receipt.orderDetails = orderDetails;
                return res.json(receipt);
            }
            else {
                throw Error("no such receipt");
            }
        }
        catch (error) {
            console.log(error);
            return;
        }
    };
}
exports.ReceiptController = ReceiptController;
