import express from "express";
import { Request, Response } from "express";
import { MenuIdService } from "../services/MenuService";

export class MenuController {
  router = express.Router();
  constructor(private menuService: MenuIdService) {
    this.router.post("/menu", this.productionSelectionId);
    this.router.post("/categoryItem", this.categoryItem);
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
  categoryItem = async (req: Request, res: Response) => {
    const categoryIdList = req.body.categoryIdList;

    const categoryItemList: {
      categoryName: string;
      itemsInformation: {
        id: number;
        name: string;
        item_photo: string;
        price: number;
        description: string;
        shop_id: number;
      }[];
    }[] = [];

    for (const category of categoryIdList) {
      const categoryId = category.category_id;
      const result = await this.menuService.getCategoryItem(categoryId);
      console.log("result", result);

      const categoryItem: {
        categoryName: string;
        itemsInformation: {
          id: number;
          name: string;
          item_photo: string;
          price: number;
          description: string;
          shop_id: number;
        }[];
      } = {
        categoryName: "",
        itemsInformation: [],
      };

      if (result && result.length === 2) {
        const [categoryName, itemsInformation] = result;
        // console.log("categoryName", categoryName);
        // console.log("itemsInformation", itemsInformation);
        // console.log("result", result);

        // Take off the duplicate name
        if (
          categoryItemList.find(
            (category) => category.categoryName === categoryName[0].name
          ) &&
          categoryItemList.find((category) => category.itemsInformation[0].name)
        ) {
          continue;
        }
        if (categoryName && categoryName.length > 0) {
          categoryItem.categoryName = categoryName[0].name;
        }
        if (itemsInformation && itemsInformation.length > 0) {
          categoryItem.itemsInformation = itemsInformation as {
            id: number;
            name: string;
            item_photo: string;
            price: number;
            description: string;
            shop_id: number;
          }[];
        }
      }
      //console.log("categoryItem", categoryItem);
      categoryItemList.push(categoryItem);
    }
    // console.log("categoryItemList", categoryItemList);

    const result = categoryItemList;
    // console.log("result", result);

    res.status(200).json(result);
  };

  // ------------------------------------------------------------------------------
  shopInformation = async (req: Request, res: Response) => {
    // console.log("check shop information", req.body);
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
  //   console.log("categoryIdList", categoryIdList);
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
