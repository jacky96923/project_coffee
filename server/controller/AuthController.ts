import express, { Request, Response } from "express";
import { UserAuthService } from "../services/AuthService";

export class UserAuthController {
  router = express.Router();
  public constructor(private userAuthService: UserAuthService) {
    this.router.post("/userLogin", this.userLogin);
  }

  userLogin = async (req: Request, res: Response) => {
    let { loginName, loginPassword } = req.body;
    let result = await this.userAuthService.userLogin(loginName, loginPassword);

    if (result.flag) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(400).json(result.message);
    }
  };
}
