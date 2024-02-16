import express, { Request, Response } from "express";
import { ItemPageService } from "../services/ItemPageService";

export class ItemPageController {
  router = express.Router();
  public constructor(private itemPageService: ItemPageService) {
    this.router.get("/:id", this.getItemInfo);
  }

  getItemInfo = async (req: Request, res: Response) => {
    let itemId = parseInt(req.params.id);
    console.log("request param", req.params.id);
    console.log("----------", itemId);
    try {
      let itemName: any = await this.itemPageService.getItem(itemId);
      let items = await this.itemPageService.getItemInfo(itemName);

      return res.json(items);
    } catch (error) {
      console.log("ItemPageController:", error);
    }
  };
}
