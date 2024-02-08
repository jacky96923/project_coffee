import express, { Request, Response } from "express";
import { UserAuthService } from "../services/AuthService";

export class UserAuthController {
  router = express.Router();
  public constructor(private userAuthService: UserAuthService) {
    this.router.post("/userLogin", this.userLogin);
  }

  userLogin = async (req: Request, res: Response) => {};
}
