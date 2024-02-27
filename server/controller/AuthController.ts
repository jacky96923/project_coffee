import express, { Request, Response } from "express";
import { BusinessAuthService, UserAuthService } from "../services/AuthService";
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { hashPassword } from "../utils/hash";
dotenv.config(); 
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
      res.status(400).json({ message: result.message });
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
        return res.status(401).json({
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
  private pool: Pool;

  public constructor(private businessAuthService: BusinessAuthService) {
    // Initialize PostgreSQL pool using environment variables
    this.pool = new Pool({
      user: process.env.DB_USERNAME,
      host: 'localhost',
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: 5432, // Default PostgreSQL port
    });
    this.router.post("/BusinessLogin", this.businessLogin);
    this.router.post("/BusinessRegister", this.businessRegister);
    this.router.post("/info", this.businessRegister);
    this.router.post("/api", this.addOpeningDays);
  }

  businessLogin = async (req: Request, res: Response) => {
    let { username, shop_name, password } = req.body;
    let result = await this.businessAuthService.businessLogin(username, password);

    if (result.flag) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(400).json(result.message);
    }
  };
  businessRegister = async (req: Request, res: Response) => {
    try {
      const { login_name, shop_name, login_password, contact_no, area, district, address } = req.body;
  
      // Check if login_name already exists
      const existingUser = await this.pool.query(
        `SELECT * FROM shops WHERE login_name = $1`,
        [login_name]
      );
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: '請使用其他登入名稱註冊' });
      }
  
      // Hash the password
      const hashedPassword = await hashPassword(login_password);
  
      // Insert hashed password into PostgreSQL
      const insertQuery = `
        INSERT INTO shops (login_name, shop_name, login_password, contact_no, area, district, address)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const params = [login_name, shop_name, hashedPassword, contact_no, area || null, district || null, address || null];
      await this.pool.query(insertQuery, params);
  
      res.status(200).json({
        login_name,
        shop_name,
        login_password: hashedPassword,
        area,
        district,
        address
      });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
    
  };
  addOpeningDays = async (req: Request, res: Response) => {
    try {
      const { openingTimes } = req.body;
      console.log(openingTimes)

      for (let i = 0; i < openingTimes.length; i++) {
        const { day, start_time, close_time, shop_id } = openingTimes[i];
        console.log({day, start_time, close_time})

        const insertQuery = `
        INSERT INTO opening_days (day, start_time, close_time)
        VALUES ($1, $2, $3)
      `;
      const params = [day, start_time, close_time];
      await this.pool.query(insertQuery, params);

      }
      // Insert data into the opening_days table using the Pool instance

      res.status(200).json({ success: true, message: 'hello' });
    } catch (error) {
      console.error('Error inserting opening days:', error);
      res.status(500).json({ success: false, error: 'hello' });
    }
  };
}
