import express, { Request, Response } from "express";
import { ReceiptService } from "../services/ReceiptService";

export class ReceiptController {
  router = express.Router();
  public constructor(private receiptService: ReceiptService) {
    this.router.get("/allReceipts/:userId", this.getAllReceipts);
    this.router.get("/receipt/:id", this.getReceipt);
  }

  getAllReceipts = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    try {
      let allReceipts = await this.receiptService.getAllReceipts(userId);
      console.log("allReceipts", allReceipts)
      return res.json(allReceipts);
    } catch (error) {
      console.log("AllReceipt Error", error);
    }
  };

  getReceipt = async (req: Request, res: Response) => {
    let itemId = parseInt(req.params.id);
    let option = req.params.option;
    try {
      let optionList = await this.receiptService.getAllReceipts(itemId);
      return res.json(optionList);
    } catch (error) {
      console.log("slideError", error);
    }
  };
}
