import express, { Request, Response } from "express";
import { BusinessAuthService, UserAuthService } from "../services/AuthService";

export class UserAuthController {
  router = express.Router();
  public constructor(private userAuthService: UserAuthService) {
    this.router.post("/userLogin", this.userLogin);
  }

  async userLogin(req: Request, res: Response) {
    let { loginName, loginPassword } = req.body;
    let result = await this.userAuthService.userLogin(loginName, loginPassword);

    if (result.flag) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(400).json(result.message);
    }
  }

  async userRegister(req: Request, res: Response) {
    try {
      const { name, email, password, confirmPassword, contactNo } = req.body;
      if (!name) {
        return res
          .status(401)
          .json({ element: "name", error: "Missing Username" });
      }
      if (!email) {
        return res
          .status(401)
          .json({ element: "email", error: "Missing Email" });
      }
      if (!password) {
        return res
          .status(401)
          .json({ element: "password", error: "Missing Password" });
      }
      if (password != confirmPassword) {
        return res.status(401).json({
          element: "confirmPassword",
          error: "Password is not the same as Confirm Password",
        });
      }
    } catch (error) {}
  }
}

export class BusinessAuthController {
  router = express.Router();
  public constructor(private businessAuthService: BusinessAuthService) {
    this.router.post("/businessLogin", this.businessLogin);
  }
  async businessLogin(req: Request, res: Response) {
    let { loginName, loginPassword } = req.body;
    let result = await this.businessAuthService.businessLogin(
      loginName,
      loginPassword
    );

    if (result.flag) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(400).json(result.message);
    }
  }
}
