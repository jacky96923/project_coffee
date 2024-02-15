import express from "express";
import { Request, Response } from "express";
import { ShopService } from "../services/ShopService";

export class ShopController {
  router = express.Router();
  constructor(private shopService: ShopService) {
    this.router.get("/shop", this.list);
  }
  list = async (req: Request, res: Response) => {
    console.log("check name and address", req.body);
    let list = await this.shopService.getItem();
    console.log("list", list);

    res.status(200).json({ data: list });
  };
}
