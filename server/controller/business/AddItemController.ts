import express, { Request, Response } from "express";
import { AddItemService } from "../../services/business/AddItemService";
import { isLoggedIn } from "../../utils/guard";
import fs from "fs";
import formidable from "formidable";
import { bucketName, s3 } from "../../utils/s3upload";


export class AddItemController {
  router = express.Router();
  public constructor(private addItemService: AddItemService) {
    this.router.get("/getItemInfo/:itemId", isLoggedIn, this.getItem);
    this.router.get("/getAllTypes", isLoggedIn, this.getAllTypes);
    this.router.post("/addItemInfo", isLoggedIn, this.addItemInfo);
    this.router.get("/getAllOptionListWithOptions", isLoggedIn, this.getAllOptionListWithOptions)
  }

  getItem = async (req: Request, res: Response) => {
    let shopId = req.body.user_id; 
    let itemId = Number(req.params.itemId);
    console.log("itemId", itemId)
    try {
      let result = await this.addItemService.getItems(shopId, itemId);
      return res.json(result);
    } catch (error) {
      console.log("AddItem controller", error);
    }
  };

  getAllTypes = async (req: Request, res: Response) => {
    let shopId = req.body.user_id;
    try {
      let result = await this.addItemService.getAllTypes(shopId);
      return res.json(result);
    } catch (error) {
      console.log("getAllTypes controller", error);
    }
  };

  addItemInfo = async (req: Request, res: Response) => {
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
        const itemName = fields.itemName as string;
        const itemTypeId = Number(fields.itemTypeId as string);
        const itemSizePrice = JSON.parse(fields.itemSizePrice as string);
        const description = fields.description as string;
        console.log("fields ok")
        let photoUrl = "";

        const itemPhoto = files.itemPhoto as formidable.File;
        const itemPhotoKey = itemPhoto.newFilename;
        const itemPhotoType = itemPhoto.mimetype!;
        console.log("diu")
        const itemPhotoUploadParams = {
          Bucket: bucketName,
          Key: itemPhotoKey,
          Body: fs.createReadStream(itemPhoto.filepath),
          ContentType: itemPhotoType,
        };
        const uploadPhoto = () => {
          return new Promise<void>((resolve, reject) => {
            s3.upload(itemPhotoUploadParams, (err: any, data: any) => {
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

        console.log("itemName", itemName)
        console.log("itemTypeId", itemTypeId);
        console.log("itemSizePrice", itemSizePrice)
        console.log("description", description)
        console.log("check s3 photo url outside", photoUrl);

        let result = await this.addItemService.addItemInfo(itemName, itemTypeId, itemSizePrice, description, photoUrl, shopId);
        return res.json(result);

      }
      catch (err) {
        res
          .status(502)
          .json({ error: "Failed to upload to S3. " + String(err) });
      }
    })
  }
  getAllOptionListWithOptions = async (req: Request, res: Response) => {
    let shopId = req.body.user_id;
    try {
      let result = await this.addItemService.getAllOptionListWithOptions(shopId);
      return res.json(result);
    } catch (error) {
      console.log("getAllOptionListWithOptions controller", error);
    }
  }
}
