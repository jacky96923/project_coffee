import express, { Request, Response } from "express";
import { AddItemService } from "../../services/business/AddItemService";
import { isLoggedIn } from "../../utils/guard";

export class AddItemController {
  router = express.Router();
  public constructor(private addItemService: AddItemService) {
    this.router.get("/getItem/:id", isLoggedIn, this.getItem);
    this.router.get("/getAllTypes", isLoggedIn, this.getAllTypes);
  }

  getItem = async (req: Request, res: Response) => {
    let shopId = req.body.user_id;
    let itemId = req.body.itemId;
    try {
      let result = await this.addItemService.getItems(shopId, itemId);
      return res.json(result);
    } catch (error) {
      console.log("AddItem controller", error);
    }
  };

  getAllTypes = async (req: Request, res: Response) => {
    let shopId = req.body.user_id;
    try {
      let result = await this.addItemService.getAllTypes(shopId);
      return res.json(result);
    } catch (error) {
      console.log("getAllTypes controller", error);
    }
  };
}
