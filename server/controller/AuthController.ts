import express, { Request, Response } from "express";
import { BusinessAuthService, UserAuthService } from "../services/AuthService";

export class UserAuthController {
  router = express.Router();
  public constructor(private userAuthService: UserAuthService) {
    this.router.post("/userLogin", this.userLogin);
    this.router.post("/userRegister", this.userRegister);
  }

  userLogin = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    let result = await this.userAuthService.userLogin(username, password);

    if (result.flag) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(400).json(result.message);
    }
  }

  userRegister = async (req: Request, res: Response) => {
    try {
      const { name, email, password, confirmPassword, contactNo } = req.body;
      //console.log(email)
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
      if (!contactNo) {
        return res
          .status(401)
          .json({ element: "contactNo", error: "Missing Contact Number" });
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

      let checkEmail = await this.userAuthService.hasEmail(email);
      let checkContactNo = await this.userAuthService.hasContactNo(contactNo)
      if (checkEmail) {
        return res.status(401).json({ element: "email", error: "This email has been registered" })
      } 
      if (checkContactNo) {
        return res.status(401).json({ element: "contactNo", error: "This contact number has been registered" })
      }
      const result = await this.userAuthService.userRegister(name, email, password, contactNo)
      console.log(result)
      return res.status(200).json({ success: true })

    } catch (error) {
      return console.error("error:", error);
    }
  }
}

export class BusinessAuthController {
  router = express.Router();
  public constructor(private businessAuthService: BusinessAuthService) {
    this.router.post("/businessLogin", this.businessLogin);
    this.router.post("/businessRegister", this.businessRegister);
  }
  async businessLogin(req: Request, res: Response) {
    let { username, password } = req.body;
    let result = await this.businessAuthService.businessLogin(
      username,
      password
    );

    if (result.flag) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(400).json(result.message);
    }
  }
  async businessRegister(req: Request, res: Response) {
    try {
      // Q1: if method is used rather than property of function, how can the router work?
      // Q2: store info of different pages in localstorage, then assemble them in 1 form
      // register according to the form?
      // Q3: should email be used as username for login? (validation issue)
    } catch (error) {

    }
  }
}
