import express, { Request, Response } from "express";
import { isLoggedIn } from "../../utils/guard";
import { EditShopInfoService } from "../../services/business/EditShopInfoService";

export class EditShopInfoController {
  router = express.Router();
  public constructor(private editShopInfoService: EditShopInfoService) {
    this.router.post("/edit", isLoggedIn, this.editShopInfo);
  }

  editShopInfo = async (req: Request, res: Response) => {
    let shopId = req.body.user_id;
    let area = req.body.area;
    let district = req.body.district;
    let address = req.body.address;
    try {
      let result = await this.editShopInfoService.postEditShopInfo(
        shopId,
        area,
        district,
        address
      );
      return res.json(result);
    } catch (error) {
      console.log("EditShopInfo controller", error);
    }
  };
}
