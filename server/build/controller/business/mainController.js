"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const express_1 = __importDefault(require("express"));
const guard_1 = require("../../utils/guard");
class MainController {
    mainService;
    router = express_1.default.Router();
    constructor(mainService) {
        this.mainService = mainService;
        this.router.post("/getMainInfo", guard_1.isLoggedIn, this.getMainInfo);
    }
    getMainInfo = async (req, res) => {
        let shopId = Number(req.body.shopId);
        console.log("shopId", shopId);
        let result = await this.mainService.getMainInfo(shopId);
        // console.log("UpdateCategoryName", UpdateCategoryName);
        res.status(200).json(result);
    };
}
exports.MainController = MainController;
