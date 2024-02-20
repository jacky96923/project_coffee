import express from "express";
import { Request, Response } from "express";
import { MenuPreviewService } from "../services/MenuPreviewServices";

export class MenuPreviewController {
  router = express.Router();
  constructor(private menuPreviewService: MenuPreviewService) {
    this.router.post("/menuPreview", this.menuPreview);
  }

  menuPreview = async (req: Request, res: Response) => {
    let shopId = req.body.id;
    console.log("shopId", shopId);

    let menu = await this.menuPreviewService.getMenuPreview(shopId);

    console.log("menu", menu);

    res.status(200).json(menu);
  };
}
