import express, { Request, Response } from "express";
import { AllItemService } from "../../services/business/AllItemService";
import { isLoggedIn } from "../../utils/guard";

export class AllItemController {
  router = express.Router();
  public constructor(private allItemService: AllItemService) {
    this.router.get("/getAllItem", isLoggedIn, this.getAllItem);
    this.router.get("/getAllItem/passCheckedItem", isLoggedIn, this.getAllItem);
  }

  getAllItem = async (req: Request, res: Response) => {
    console.log("business id is ", req.body.user_id);
    let shopId = req.body.user_id;
    try {
      let result = await this.allItemService.getAllItem(shopId);
      console.log("AllItem Con result", result);
      return res.json(result);
    } catch (error) {
      console.log("AllItem controller", error);
    }
  };

  passCheckedItem = async (req: Request, res: Response) => {
    let shopId = req.body.user_id;
    let checkedItemList = req.body.json;
    console.log("passCheckedItem Controller", checkedItemList);
    try {
    } catch (error) {}
  };
}
