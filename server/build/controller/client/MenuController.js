"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const express_1 = __importDefault(require("express"));
class MenuController {
    menuService;
    router = express_1.default.Router();
    constructor(menuService) {
        this.menuService = menuService;
        this.router.post("/menu", this.productionSelectionId);
        this.router.post("/categoryItem", this.categoryItem);
        this.router.post("/shopInformation", this.shopInformation);
        // this.router.post("/itemsInformation", this.itemsInformation);
    }
    // ------------------------------------------------------------------------------
    productionSelectionId = async (req, res) => {
        // console.log("check id", req.body.id);
        let shopId = req.body.id;
        let productionSelectionId = await this.menuService.getCategoryId(shopId);
        // console.log("productionSelectionId", productionSelectionId);
        res.status(200).json({ data: productionSelectionId });
    };
    // ------------------------------------------------------------------------------
    categoryItem = async (req, res) => {
        const categoryIdList = req.body.categoryIdList;
        const categoryItemList = [];
        for (const category of categoryIdList) {
            const categoryId = category.category_id;
            const result = await this.menuService.getCategoryItem(categoryId);
            console.log("result", result);
            const categoryItem = {
                categoryName: "",
                itemsInformation: [],
            };
            if (result && result.length === 2) {
                const [categoryName, itemsInformation] = result;
                // console.log("categoryName", categoryName);
                // console.log("itemsInformation", itemsInformation);
                // console.log("result", result);
                // Take off the duplicate name
                if (categoryItemList.find((category) => category.categoryName === categoryName[0].name) &&
                    categoryItemList.find((category) => category.itemsInformation[0].name)) {
                    continue;
                }
                if (categoryName && categoryName.length > 0) {
                    categoryItem.categoryName = categoryName[0].name;
                }
                if (itemsInformation && itemsInformation.length > 0) {
                    categoryItem.itemsInformation = itemsInformation;
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
    shopInformation = async (req, res) => {
        // console.log("check shop information", req.body);
        let shopId = req.body.id;
        // console.log("shopId", shopId);
        let shopInformation = await this.menuService.getShopInformation(shopId);
        // console.log("shopInformation", shopInformation);
        res.status(200).json({ data: shopInformation });
    };
}
exports.MenuController = MenuController;
