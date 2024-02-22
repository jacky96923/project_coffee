import express from "express";
import { Request, Response } from "express";
import { DialogAddItemService } from "../services/DialogAddItemService";

export class DialogAddItemController {
  router = express.Router();
  constructor(private dialogAddItemService: DialogAddItemService) {
    this.router.post("/categoryName", this.categoryName);
  }

  categoryName = async (req: Request, res: Response) => {
    let catName = req.body.nameInput;
    let shopId = Number(req.body.shopId);

    let categoryName = await this.dialogAddItemService.postCatName(
      catName,
      shopId
    );
    console.log("categoryName", categoryName);

    res.status(200).json(categoryName);
  };
}
