"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPageController = void 0;
const express_1 = __importDefault(require("express"));
class ItemPageController {
    itemPageService;
    router = express_1.default.Router();
    constructor(itemPageService) {
        this.itemPageService = itemPageService;
        this.router.get("/:id", this.getItemInfo);
        this.router.get("/initialState/:id", this.getInitalState);
    }
    getItemInfo = async (req, res) => {
        let itemId = parseInt(req.params.id);
        console.log("request param", req.params.id);
        console.log("----------", itemId);
        try {
            let itemName = await this.itemPageService.getItem(itemId);
            let items = await this.itemPageService.getItemInfo(itemName);
            console.log("getItemInfo", items);
            return res.json(items);
        }
        catch (error) {
            console.log("ItemPageController:", error);
        }
    };
    getInitalState = async (req, res) => {
        let itemId = parseInt(req.params.id);
        try {
            let initialState = await this.itemPageService.getInitalState(itemId);
            console.log(initialState);
            return res.json(initialState);
        }
        catch (error) {
            console.log("Cannot get initial state:", error);
        }
    };
}
exports.ItemPageController = ItemPageController;
