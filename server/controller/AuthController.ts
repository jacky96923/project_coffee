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
      res.status(400).json({message: result.message});
    }
  };

  userRegister = async (req: Request, res: Response) => {
    try {
      const { username, email, password, confirmPassword, contactNo } =
        req.body;
      //console.log(email)
      if (!username) {
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
      let checkContactNo = await this.userAuthService.hasContactNo(contactNo);
      if (checkEmail) {
        return res
          .status(401)
          .json({ element: "email", error: "This email has been registered" });
      }
      if (checkContactNo) {
        return res
          .status(401)
          .json({
            element: "contactNo",
            error: "This contact number has been registered",
          });
      }
      const result = (await this.userAuthService.userRegister(
        username,
        email,
        confirmPassword,
        contactNo
      )) as any;
      if (result.flag) {
        return res.json({ message: result.message, token: result.token });
      } else {
        return res.status(400).json(result.message);
      }
    } catch (error) {
      return console.error("error:", error);
    }
  };
}

export class BusinessAuthController {
  router = express.Router();
  public constructor(private businessAuthService: BusinessAuthService) {
    this.router.post("/BusinessLogin", this.businessLogin);
    this.router.post("/BusinessRegister", this.businessRegister);
    this.router.post("/info", this.businessRegister);

  }
  businessLogin = async (req: Request, res: Response) => {
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
  };
  async businessRegister(req: Request, res: Response) {
    try {
      // Extracting data sent from the client
      const { login_name, login_password, contact_no, area, district, address } = req.body;
  
      // Here you can process the received data as needed
      // For now, let's just send it back as part of the response
      res.status(200).json({
        
        login_name,
        login_password,
        contact_no,
        area,
        district,
        address
      });
    } catch (error) {
      // In case of any errors during the registration process, return a server error
      res.status(500).json({ message: "Internal server error" });
    }
  }}