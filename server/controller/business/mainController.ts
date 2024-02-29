import express from "express";
import { Request, Response } from "express";
import { MainService } from "../../services/business/mainService";
import { isLoggedIn } from "../../utils/guard";

export class MainController {
  router = express.Router();
  constructor(private mainService: MainService) {
    this.router.post("/getMainInfo", isLoggedIn, this.getMainInfo);
  }

  getMainInfo = async (req: Request, res: Response) => {
    let shopId = Number(req.body.shopId);
    console.log("shopId", shopId);

    let result = await this.mainService.getMainInfo(shopId);
    // console.log("UpdateCategoryName", UpdateCategoryName);

    res.status(200).json(result);
  };
}
