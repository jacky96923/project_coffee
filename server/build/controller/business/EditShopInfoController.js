"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditShopInfoController = void 0;
const express_1 = __importDefault(require("express"));
const guard_1 = require("../../utils/guard");
class EditShopInfoController {
    editShopInfoService;
    router = express_1.default.Router();
    constructor(editShopInfoService) {
        this.editShopInfoService = editShopInfoService;
        this.router.post("/edit", guard_1.isLoggedIn, this.editShopInfo);
    }
    editShopInfo = async (req, res) => {
        let shopId = req.body.user_id;
        let area = req.body.area;
        let district = req.body.district;
        let address = req.body.address;
        try {
            let result = await this.editShopInfoService.postEditShopInfo(shopId, area, district, address);
            return res.json(result);
        }
        catch (error) {
            console.log("EditShopInfo controller", error);
        }
    };
}
exports.EditShopInfoController = EditShopInfoController;
