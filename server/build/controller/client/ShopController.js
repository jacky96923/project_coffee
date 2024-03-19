"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopController = void 0;
const express_1 = __importDefault(require("express"));
class ShopController {
    shopService;
    router = express_1.default.Router();
    constructor(shopService) {
        this.shopService = shopService;
        this.router.get("/shop", this.list);
    }
    list = async (req, res) => {
        console.log("check name and address", req.body);
        let list = await this.shopService.getItem();
        console.log("list", list);
        res.status(200).json({ data: list });
    };
}
exports.ShopController = ShopController;
