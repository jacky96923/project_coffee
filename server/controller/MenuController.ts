import express from "express";
import { Request, Response } from "express";
import { MenuIdService } from "../services/MenuService";

export class MenuController {
  router = express.Router();
  constructor(private menuService: MenuIdService) {
    this.router.post("/menu", this.productionSelectionId);
    this.router.post("/category", this.categoryName);
    this.router.post("/shopInformation", this.shopInformation);
    // this.router.post("/itemsInformation", this.itemsInformation);
  }
  // ------------------------------------------------------------------------------
  productionSelectionId = async (req: Request, res: Response) => {
    // console.log("check id", req.body.id);
    let shopId = req.body.id;
    let productionSelectionId = await this.menuService.getCategoryId(shopId);
    // console.log("productionSelectionId", productionSelectionId);
    res.status(200).json({ data: productionSelectionId });
  };

  // ------------------------------------------------------------------------------
  categoryName = async (req: Request, res: Response) => {
    // console.log("check category", req.body);
    let categoryIdList = req.body.categoryIdList;
    // console.log("categoryIdList", categoryIdList);
    const categoryNameList: string[] = [];
    for (let i = 0; i < categoryIdList.length; i++) {
      const categoryId = categoryIdList[i].category_id;
      const categoryName: any = await this.menuService.getCategoryName(
        categoryId
      );
      if (!categoryNameList.includes(categoryName[0].name)) {
        categoryNameList.push(categoryName[0].name);
      }
    }
    // console.log("Category Names", categoryNameList);
    res.status(200).json({ data: categoryNameList });
  };

  // ------------------------------------------------------------------------------
  shopInformation = async (req: Request, res: Response) => {
    console.log("check shop information", req.body);
    let shopId = req.body.id;
    // console.log("shopId", shopId);

    let shopInformation = await this.menuService.getShopInformation(shopId);
    // console.log("shopInformation", shopInformation);

    res.status(200).json({ data: shopInformation });
  };

  // ------------------------------------------------------------------------------
  // itemsInformation = async (req: Request, res: Response) => {
  //   // console.log("check category", req.body);
  //   let categoryIdList = req.body.categoryIdList;
  //   // console.log("categoryIdList", categoryIdList);
  //   const categoryNameList: string[] = [];
  //   for (let i = 0; i < categoryIdList.length; i++) {
  //     const categoryId = categoryIdList[i].category_id;
  //     let itemsInformation = await this.menuService.getItemsInformation(
  //       categoryId
  //     );

  //     //       if (!categoryNameList.includes(categoryName[0].name)) {
  //     //   categoryNameList.push(categoryName[0].name);
  //     // }
  //     console.log("itemsInformation", itemsInformation);

  //     res.status(200).json(itemsInformation);
  //   }
  // };
}
