import express, { Request, Response } from "express";
import { PromotionInfoService } from "../../services/business/PromotionInfoService";
import formidable from "formidable";
import { bucketName, s3 } from "../../utils/s3upload";
import fs from "fs";
import { isLoggedIn } from "../../utils/guard";

export class PromotionInfoController {
  router = express.Router();
  public constructor(private promotionInfoService: PromotionInfoService) {
    this.router.get("/getPromotionInfo/:id", this.getPromotionInfo);
    this.router.post("/uploads/:id", isLoggedIn, this.uploadPromotionInfo);
  }

  getPromotionInfo = async (req: Request, res: Response) => {
    let shopId = req.params.id;
    console.log("PromoController", shopId);
    try {
      let result = await this.promotionInfoService.getpromotionInfo(
        parseInt(shopId)
      );
      console.log("promoController", result);
      return res.json(result);
    } catch (error) {
      console.log("controller", error);
    }
  };

  uploadPromotionInfo = async (req: Request, res: Response) => {
    const form = new formidable.IncomingForm();
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
        const description = fields.description as string;

        let logoUrl = "";
        let bannerUrl = "";
        if (files.logoFile) {
          const logo_file = files.logoFile as formidable.File;
          const logoKey = logo_file.newFilename;
          const logoType = logo_file.mimetype!;
          const logoUploadParams = {
            Bucket: bucketName,
            Key: logoKey,
            Body: fs.createReadStream(logo_file.filepath),
            ContentType: logoType,
          };
          const uploadLogo = () => {
            return new Promise<void>((resolve, reject) => {
              s3.upload(logoUploadParams, (err: any, data: any) => {
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
          const banner_file = files.bannerFile as formidable.File;
          const bannerKey = banner_file.newFilename;
          const bannerType = banner_file.mimetype!;
          const bannerUploadParams = {
            Bucket: bucketName,
            Key: bannerKey,
            Body: fs.createReadStream(banner_file.filepath),
            ContentType: bannerType,
          };
          const uploadBanner = () => {
            return new Promise<void>((resolve, reject) => {
              s3.upload(bannerUploadParams, (err: any, data: any) => {
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

        let result = await this.promotionInfoService.postPromotionInfo(
          shopId,
          description,
          bannerUrl,
          logoUrl
        );

        return res.json(result);
      } catch (err) {
        res
          .status(502)
          .json({ error: "Failed to upload to S3. " + String(err) });
      }
    });
  };
}
