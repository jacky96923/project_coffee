import express, { Request, Response } from "express";
import { ItemPageService } from "../../services/client/ItemPageService";

export class ItemPageController {
  router = express.Router();
  public constructor(private itemPageService: ItemPageService) {
    this.router.get("/:id", this.getItemInfo);
    this.router.get("/initialState/:id", this.getInitalState);
  }

  getItemInfo = async (req: Request, res: Response) => {
    let itemId = parseInt(req.params.id);
    console.log("request param", req.params.id);
    console.log("----------", itemId);
    try {
      let itemName: any = await this.itemPageService.getItem(itemId);
      let items = await this.itemPageService.getItemInfo(itemName);
      console.log("getItemInfo", items);
      return res.json(items);
    } catch (error) {
      console.log("ItemPageController:", error);
    }
  };

  getInitalState = async (req: Request, res: Response) => {
    let itemId = parseInt(req.params.id);
    try {
      let initialState = await this.itemPageService.getInitalState(itemId);
      console.log(initialState);
      return res.json(initialState);
    } catch (error) {
      console.log("Cannot get initial state:", error);
    }
  };
}
