import express, { Request, Response } from "express";
import { ReceiptService } from "../services/ReceiptService";

export class ReceiptController {
  router = express.Router();
  public constructor(private receiptService: ReceiptService) {
    this.router.get("/allReceipts/:userId", this.getAllReceipts);
    this.router.get("/:transactionId", this.getReceipt);
  }

  getAllReceipts = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    try {
      let allReceipts = await this.receiptService.getAllReceipts(userId);
      //console.log("allReceipts", allReceipts)
      return res.json(allReceipts);
    } catch (error) {
      console.log("AllReceipt Error", error);
    }
  };

  getReceipt = async (req: Request, res: Response) => {
    const transactionId = Number(req.params.transactionId)
    try {
      let receipt = await this.receiptService.getReceipt(transactionId);
      let orderDetails = await this.receiptService.getOrderDetails(transactionId)
      
      if (receipt && orderDetails){
        // res.json({receipt, orderDetails}) does not work
        receipt.orderDetails = orderDetails
        return res.json(receipt);
      } else{
        throw Error("no such receipt")
      }
    } catch (error) {
      console.log(error);
      return 
    }
  };
}
