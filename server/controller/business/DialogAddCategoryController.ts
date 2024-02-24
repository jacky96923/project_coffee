import express from "express";
import { Request, Response } from "express";
import { DialogAddCategoryService } from "../../services/business/DialogAddCategoryService";

export class DialogAddCategoryController {
  router = express.Router();
  constructor(private dialogAddCategoryService: DialogAddCategoryService) {
    this.router.post("/categoryName", this.categoryName);
  }

  categoryName = async (req: Request, res: Response) => {
    let catName = req.body.nameInput;
    let shopId = Number(req.body.shopId);

    let categoryName = await this.dialogAddCategoryService.postCatName(
      catName,
      shopId
    );
    // console.log("categoryName", categoryName);

    res.status(200).json(categoryName);
  };
}
