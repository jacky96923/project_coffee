import express from "express";
import { Request, Response } from "express";
import { MenuPreviewService } from "../../services/business/MenuPreviewServices";

export class MenuPreviewController {
  router = express.Router();
  constructor(private menuPreviewService: MenuPreviewService) {
    this.router.post("/menuPreview", this.menuPreview);
    this.router.put("/updateCategoryName", this.updateCategoryName);
    this.router.delete("/deleteCategoryName", this.deleteCategoryName);
    this.router.delete("/deleteItem", this.deleteItem);
    this.router.put("/addItemToCat", this.addItemToCat);
  }

  menuPreview = async (req: Request, res: Response) => {
    let shopId = req.body.id;
    // console.log("shopId", shopId);

    let menuList: {
      category: {
        categoryId: number;
        categoryName: string;
        categoryIcon: string;
      };
      itemsInformation: {
        id: number;
        name: string;
        item_photo: string;
        price: number;
        description: string;
        shop_id: number;
        size?: string;
      }[];
    }[] = [];

    let result = await this.menuPreviewService.getMenuPreview(shopId);

    //console.log("result", result);

    // menuList = result
    // for (const menus of result) {
    // console.log("menu", menu);

    if (result && result.length === 2) {
      let menuCategoryItem: {
        category: {
          categoryId: number;
          categoryName: string;
          categoryIcon: string;
        };
        itemsInformation: {
          id: number;
          name: string;
          item_photo: string;
          price: number;
          description: string;
          shop_id: number;
          size?: string;
        }[];
      } = {
        category: {
          categoryId: 0,
          categoryName: "",
          categoryIcon: "",
        },
        itemsInformation: [],
      };
      const [categoryNameIconList, itemsInformation] = result;
      // console.log("categoryNameIconList", categoryNameIconList);

      let i = 0;
      for (let category of categoryNameIconList) {
        if (
          menuList.find((menu) => menu.category.categoryName === category.name)
          //    &&
          //   menuList.find((category) => category.itemsInformation[0].name)
        ) {
          i++;
        } else {
          menuCategoryItem.category.categoryName = category.name;
          menuCategoryItem.category.categoryId = category.id;

          // menuCategoryItem.category.categoryIcon = category.icon;

          if (itemsInformation[i] && itemsInformation[i].length > 0) {
            // lack classification
            // console.log(
            //   "hi category",
            //   menuCategoryItem.category.categoryName,
            //   "you have items:",
            //   itemsInformation[i]
            // );
            menuCategoryItem.itemsInformation = itemsInformation[i] as {
              id: number;
              name: string;
              item_photo: string;
              price: number;
              description: string;
              shop_id: number;
              size?: string;
            }[];
            i++;
          }
          // console.log("before push", menuCategoryItem);
          menuList.push({ ...menuCategoryItem });

          // console.log("check menu list", menuList);

          menuCategoryItem = {
            category: {
              categoryId: 0,
              categoryName: "",
              categoryIcon: "",
            },
            itemsInformation: [],
          };
        }
      }
    }
    //   menuList.push(menuCategoryItem);
    // }
    const finalResult = menuList;
    // console.log("final Result", finalResult);
    res.status(200).json(finalResult);
  };

  updateCategoryName = async (req: Request, res: Response) => {
    let updateCatName = req.body.nameInput;
    // let shopId = Number(req.body.shopId);
    let categoryId = Number(req.body.categoryId);
    // console.log("updateCatName", updateCatName);
    // console.log("shopId", shopId);

    let UpdateCategoryName = await this.menuPreviewService.putCatName(
      updateCatName,
      categoryId
    );
    // console.log("UpdateCategoryName", UpdateCategoryName);

    res.status(200).json(UpdateCategoryName);
  };

  deleteCategoryName = async (req: Request, res: Response) => {
    // let deleteCatName = req.body.nameInput;
    // let shopId = Number(req.body.shopId);
    let categoryId = Number(req.body.categoryId);
    console.log("categoryId", categoryId);

    // console.log("updateCatName", updateCatName);
    // console.log("shopId", shopId);

    let DeleteCategoryName = await this.menuPreviewService.deleteCatName(
      categoryId
    );
    // console.log("UpdateCategoryName", UpdateCategoryName);

    res.status(200).json(DeleteCategoryName);
  };

  deleteItem = async (req: Request, res: Response) => {
    let categoryId: number = req.body.categoryId;
    let itemId: number[] = req.body.itemId;
    console.log("categoryId", categoryId);
    console.log("itemId", itemId);

    let DeleteItem = await this.menuPreviewService.deleteItem(
      // categoryId,
      itemId,
      categoryId
    );
    // console.log("UpdateCategoryName", UpdateCategoryName);

    res.status(200).json(DeleteItem);
  };

  addItemToCat = async (req: Request, res: Response) => {
    let categoryId: number = req.body.categoryId;
    let itemId: number[] = req.body.itemId;
    console.log("categoryId", categoryId);
    console.log("itemId", itemId);

    let AddItem = await this.menuPreviewService.addItemToCat(
      itemId,
      categoryId
    );
    // console.log("UpdateCategoryName", UpdateCategoryName);

    res.status(200).json(AddItem);
  };
}
