"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllItemController = void 0;
const express_1 = __importDefault(require("express"));
const guard_1 = require("../../utils/guard");
class AllItemController {
    allItemService;
    router = express_1.default.Router();
    constructor(allItemService) {
        this.allItemService = allItemService;
        this.router.get("/getAllItem", guard_1.isLoggedIn, this.getAllItem);
        this.router.post("/getAllItem/passCheckedItem", guard_1.isLoggedIn, this.passCheckedItem);
    }
    getAllItem = async (req, res) => {
        console.log("business id is ", req.body.user_id);
        let shopId = req.body.user_id;
        try {
            let result = await this.allItemService.getAllItem(shopId);
            // console.log("AllItem Con result", result);
            return res.json(result);
        }
        catch (error) {
            console.log("AllItem controller", error);
        }
    };
    passCheckedItem = async (req, res) => {
        let shopId = req.body.user_id;
        let checkedItemList = req.body.checkedItemList;
        console.log("passCheckedItem Controller", checkedItemList);
        try {
            let result = await this.allItemService.changeItemStatus(checkedItemList, shopId);
            // console.log("contoller", result);
            return res.json(result);
        }
        catch (error) {
            console.log("passCheckedItemController", error);
        }
    };
}
exports.AllItemController = AllItemController;
