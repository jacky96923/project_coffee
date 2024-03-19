"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogAddCategoryController = void 0;
const express_1 = __importDefault(require("express"));
class DialogAddCategoryController {
    dialogAddCategoryService;
    router = express_1.default.Router();
    constructor(dialogAddCategoryService) {
        this.dialogAddCategoryService = dialogAddCategoryService;
        this.router.post("/categoryName", this.categoryName);
    }
    categoryName = async (req, res) => {
        let catName = req.body.nameInput;
        let shopId = Number(req.body.shopId);
        let categoryName = await this.dialogAddCategoryService.postCatName(catName, shopId);
        // console.log("categoryName", categoryName);
        res.status(200).json(categoryName);
    };
}
exports.DialogAddCategoryController = DialogAddCategoryController;
