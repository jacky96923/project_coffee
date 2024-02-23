import express from "express";
import { Request, Response } from "express";
import { MenuPreviewService } from "../services/MenuPreviewServices";

export class MenuPreviewController {
  router = express.Router();
  constructor(private menuPreviewService: MenuPreviewService) {
    this.router.post("/menuPreview", this.menuPreview);
  }

  menuPreview = async (req: Request, res: Response) => {
    let shopId = req.body.id;
    // console.log("shopId", shopId);

    let menuList: {
      category: {
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
    // console.log("result", result);

    // menuList = result
    // for (const menus of result) {
    // console.log("menu", menu);

    if (result && result.length === 2) {
      let menuCategoryItem: {
        category: {
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
          categoryName: "",
          categoryIcon: "",
        },
        itemsInformation: [],
      };
      const [categoryNameIconList, itemsInformation] = result;
      console.log("categoryNameIconList", categoryNameIconList);

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
    console.log("final Result", finalResult);
    res.status(200).json(finalResult);
  };
}
