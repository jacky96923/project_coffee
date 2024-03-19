"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuPreviewController = void 0;
const express_1 = __importDefault(require("express"));
class MenuPreviewController {
    menuPreviewService;
    router = express_1.default.Router();
    constructor(menuPreviewService) {
        this.menuPreviewService = menuPreviewService;
        this.router.post("/menuPreview", this.menuPreview);
        this.router.put("/updateCategoryName", this.updateCategoryName);
        this.router.delete("/deleteCategoryName", this.deleteCategoryName);
        this.router.delete("/deleteItem", this.deleteItem);
        this.router.put("/addItemToCat", this.addItemToCat);
    }
    menuPreview = async (req, res) => {
        let shopId = req.body.id;
        // console.log("shopId", shopId);
        let menuList = [];
        let result = await this.menuPreviewService.getMenuPreview(shopId);
        //console.log("result", result);
        // menuList = result
        // for (const menus of result) {
        // console.log("menu", menu);
        if (result && result.length === 2) {
            let menuCategoryItem = {
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
                if (menuList.find((menu) => menu.category.categoryName === category.name)
                //    &&
                //   menuList.find((category) => category.itemsInformation[0].name)
                ) {
                    i++;
                }
                else {
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
                        menuCategoryItem.itemsInformation = itemsInformation[i];
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
    updateCategoryName = async (req, res) => {
        let updateCatName = req.body.nameInput;
        // let shopId = Number(req.body.shopId);
        let categoryId = Number(req.body.categoryId);
        // console.log("updateCatName", updateCatName);
        // console.log("shopId", shopId);
        let UpdateCategoryName = await this.menuPreviewService.putCatName(updateCatName, categoryId);
        // console.log("UpdateCategoryName", UpdateCategoryName);
        res.status(200).json(UpdateCategoryName);
    };
    deleteCategoryName = async (req, res) => {
        // let deleteCatName = req.body.nameInput;
        // let shopId = Number(req.body.shopId);
        let categoryId = Number(req.body.categoryId);
        console.log("categoryId", categoryId);
        // console.log("updateCatName", updateCatName);
        // console.log("shopId", shopId);
        let DeleteCategoryName = await this.menuPreviewService.deleteCatName(categoryId);
        // console.log("UpdateCategoryName", UpdateCategoryName);
        res.status(200).json(DeleteCategoryName);
    };
    deleteItem = async (req, res) => {
        let categoryId = req.body.categoryId;
        let itemId = req.body.itemId;
        console.log("categoryId", categoryId);
        console.log("itemId", itemId);
        let DeleteItem = await this.menuPreviewService.deleteItem(
        // categoryId,
        itemId, categoryId);
        // console.log("UpdateCategoryName", UpdateCategoryName);
        res.status(200).json(DeleteItem);
    };
    addItemToCat = async (req, res) => {
        let categoryId = req.body.categoryId;
        let itemId = req.body.itemId;
        console.log("categoryId", categoryId);
        console.log("itemId", itemId);
        let AddItem = await this.menuPreviewService.addItemToCat(itemId, categoryId);
        // console.log("UpdateCategoryName", UpdateCategoryName);
        res.status(200).json(AddItem);
    };
}
exports.MenuPreviewController = MenuPreviewController;
