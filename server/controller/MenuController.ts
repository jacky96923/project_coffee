import express from "express";
import { Request, Response } from "express";
import { MenuIdService } from "../services/MenuService";

export class MenuController {
  router = express.Router();
  constructor(private menuService: MenuIdService) {
    this.router.post("/menu", this.productionSelectionId);
  }
  productionSelectionId = async (req: Request, res: Response) => {
    console.log("check id", req.body.id);
    let shopId = req.body.id;
    let productionSelectionId = await this.menuService.getCategoryId(shopId);

    console.log("productionSelectionId", productionSelectionId);
    res.status(200).json({ data: productionSelectionId });
  };

  categoryName = async (req: Request, res: Response) => {
    console.log("check category", req.body);

    let categoryIdList = req.body.categoryIdList;
    console.log("CategoryName", categoryIdList);

    const categoryNameList = [];
    for (let i = 0; i < categoryIdList.length; i++) {
      const categoryId = categoryIdList[i];
      const categoryName = await this.menuService.getCategoryName(categoryId);
      categoryNameList.push(categoryName);
    }
    console.log("Category Names", categoryNameList);

    res.status(200).json({ data: categoryIdList });
  };
}
