import express, { Request, Response } from "express";
import { OptionSlideService } from "../../services/OptionSlideService";

export class OptionSlideController {
  router = express.Router();
  public constructor(private optionSlideService: OptionSlideService) {
    this.router.get("/:id/:option", this.getOptions);
  }

  getOptions = async (req: Request, res: Response) => {
    let itemId = parseInt(req.params.id);
    let option = req.params.option;
    try {
      let optionList = await this.optionSlideService.getOptions(itemId, option);
      return res.json(optionList);
    } catch (error) {
      console.log("slideError", error);
    }
  };
}
