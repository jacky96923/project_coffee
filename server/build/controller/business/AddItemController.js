"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemController = void 0;
const express_1 = __importDefault(require("express"));
const guard_1 = require("../../utils/guard");
const fs_1 = __importDefault(require("fs"));
const formidable_1 = __importDefault(require("formidable"));
const s3upload_1 = require("../../utils/s3upload");
class AddItemController {
    addItemService;
    router = express_1.default.Router();
    constructor(addItemService) {
        this.addItemService = addItemService;
        this.router.get("/getItemInfo/:itemId", guard_1.isLoggedIn, this.getItem);
        this.router.get("/getAllTypes", guard_1.isLoggedIn, this.getAllTypes);
        this.router.post("/addItemInfo", guard_1.isLoggedIn, this.addItemInfo);
        this.router.get("/getAllOptionListWithOptions", guard_1.isLoggedIn, this.getAllOptionListWithOptions);
    }
    getItem = async (req, res) => {
        let shopId = req.body.user_id;
        let itemId = Number(req.params.itemId);
        console.log("itemId", itemId);
        try {
            let result = await this.addItemService.getItems(shopId, itemId);
            return res.json(result);
        }
        catch (error) {
            console.log("AddItem controller", error);
        }
    };
    getAllTypes = async (req, res) => {
        let shopId = req.body.user_id;
        try {
            let result = await this.addItemService.getAllTypes(shopId);
            return res.json(result);
        }
        catch (error) {
            console.log("getAllTypes controller", error);
        }
    };
    addItemInfo = async (req, res) => {
        const form = new formidable_1.default.IncomingForm();
        console.log("business id is ", req.body.user_id);
        let shopId = req.body.user_id;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res
                    .status(400)
                    .json({ error: "Failed to parse form data. " + String(err) });
                return;
            }
            try {
                console.log("check field", fields);
                const itemName = fields.itemName;
                const itemTypeId = Number(fields.itemTypeId);
                const itemSizePrice = JSON.parse(fields.itemSizePrice);
                const description = fields.description;
                console.log("fields ok");
                let photoUrl = "";
                const itemPhoto = files.itemPhoto;
                const itemPhotoKey = itemPhoto.newFilename;
                const itemPhotoType = itemPhoto.mimetype;
                console.log("diu");
                const itemPhotoUploadParams = {
                    Bucket: s3upload_1.bucketName,
                    Key: itemPhotoKey,
                    Body: fs_1.default.createReadStream(itemPhoto.filepath),
                    ContentType: itemPhotoType,
                };
                const uploadPhoto = () => {
                    return new Promise((resolve, reject) => {
                        s3upload_1.s3.upload(itemPhotoUploadParams, (err, data) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                            }
                            photoUrl = data.Location;
                            console.log("check s3 photo url", photoUrl);
                            resolve();
                        });
                    });
                };
                await uploadPhoto();
                console.log("itemName", itemName);
                console.log("itemTypeId", itemTypeId);
                console.log("itemSizePrice", itemSizePrice);
                console.log("description", description);
                console.log("check s3 photo url outside", photoUrl);
                let result = await this.addItemService.addItemInfo(itemName, itemTypeId, itemSizePrice, description, photoUrl, shopId);
                return res.json(result);
            }
            catch (err) {
                res
                    .status(502)
                    .json({ error: "Failed to upload to S3. " + String(err) });
            }
        });
    };
    getAllOptionListWithOptions = async (req, res) => {
        let shopId = req.body.user_id;
        try {
            let result = await this.addItemService.getAllOptionListWithOptions(shopId);
            return res.json(result);
        }
        catch (error) {
            console.log("getAllOptionListWithOptions controller", error);
        }
    };
}
exports.AddItemController = AddItemController;
