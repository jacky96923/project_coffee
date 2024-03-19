"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionInfoController = void 0;
const express_1 = __importDefault(require("express"));
const formidable_1 = __importDefault(require("formidable"));
const s3upload_1 = require("../../utils/s3upload");
const fs_1 = __importDefault(require("fs"));
const guard_1 = require("../../utils/guard");
class PromotionInfoController {
    promotionInfoService;
    router = express_1.default.Router();
    constructor(promotionInfoService) {
        this.promotionInfoService = promotionInfoService;
        this.router.get("/getPromotionInfo", guard_1.isLoggedIn, this.getPromotionInfo);
        this.router.post("/uploads", guard_1.isLoggedIn, this.uploadPromotionInfo);
    }
    getPromotionInfo = async (req, res) => {
        let shopId = req.body.user_id;
        console.log("PromoController", shopId);
        try {
            let result = await this.promotionInfoService.getpromotionInfo(parseInt(shopId));
            console.log("promoController", result);
            return res.json(result);
        }
        catch (error) {
            console.log("controller", error);
        }
    };
    uploadPromotionInfo = async (req, res) => {
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
                const description = fields.description;
                let logoUrl = "";
                let bannerUrl = "";
                if (files.logoFile) {
                    const logo_file = files.logoFile;
                    const logoKey = logo_file.newFilename;
                    const logoType = logo_file.mimetype;
                    const logoUploadParams = {
                        Bucket: s3upload_1.bucketName,
                        Key: logoKey,
                        Body: fs_1.default.createReadStream(logo_file.filepath),
                        ContentType: logoType,
                    };
                    const uploadLogo = () => {
                        return new Promise((resolve, reject) => {
                            s3upload_1.s3.upload(logoUploadParams, (err, data) => {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                }
                                logoUrl = data.Location;
                                console.log("check s3 logo url", logoUrl);
                                resolve();
                            });
                        });
                    };
                    await uploadLogo();
                }
                if (files.bannerFile) {
                    const banner_file = files.bannerFile;
                    const bannerKey = banner_file.newFilename;
                    const bannerType = banner_file.mimetype;
                    const bannerUploadParams = {
                        Bucket: s3upload_1.bucketName,
                        Key: bannerKey,
                        Body: fs_1.default.createReadStream(banner_file.filepath),
                        ContentType: bannerType,
                    };
                    const uploadBanner = () => {
                        return new Promise((resolve, reject) => {
                            s3upload_1.s3.upload(bannerUploadParams, (err, data) => {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                }
                                bannerUrl = data.Location;
                                console.log("check s3 banner url", bannerUrl);
                                resolve();
                            });
                        });
                    };
                    await uploadBanner();
                }
                console.log("controller", description);
                console.log("check s3 banner url outside", bannerUrl);
                console.log("check s3 logo url outside", logoUrl);
                let result = await this.promotionInfoService.postPromotionInfo(shopId, description, bannerUrl, logoUrl);
                return res.json(result);
            }
            catch (err) {
                res
                    .status(502)
                    .json({ error: "Failed to upload to S3. " + String(err) });
            }
        });
    };
}
exports.PromotionInfoController = PromotionInfoController;
