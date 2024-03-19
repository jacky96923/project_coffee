"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionSlideController = void 0;
const express_1 = __importDefault(require("express"));
class OptionSlideController {
    optionSlideService;
    router = express_1.default.Router();
    constructor(optionSlideService) {
        this.optionSlideService = optionSlideService;
        this.router.get("/:id/:option", this.getOptions);
    }
    getOptions = async (req, res) => {
        let itemId = parseInt(req.params.id);
        let option = req.params.option;
        try {
            let optionList = await this.optionSlideService.getOptions(itemId, option);
            return res.json(optionList);
        }
        catch (error) {
            console.log("slideError", error);
        }
    };
}
exports.OptionSlideController = OptionSlideController;
