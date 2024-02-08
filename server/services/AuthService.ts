import { Knex } from "knex";
import { comparePassword } from "../utils/hash";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";

export class UserAuthService {
  constructor(private knex: Knex) {}
  async userLogin(userNameInput: string, userPasswordInput: string) {
    let userLoginInfo = await this.knex
      .select("*")
      .from("users")
      .where("login_name", userNameInput);
    if (userLoginInfo.length > 0) {
      let password_hash = userLoginInfo[0].login_password;
      let compareResult = await comparePassword(
        userPasswordInput,
        password_hash
      );
      if (compareResult) {
        console.log("success");
        //login successful, create JWT and send to user's device
        const payload = {
          id: userLoginInfo[0].id,
          username: userLoginInfo[0].login_name,
        };
        const token = jwtSimple.encode(payload, jwt.jwtSecret);
        return { flag: true, message: "success", token: token };
      } else {
        return { flag: false, message: "wrong password" };
      }
    } else {
      return { flag: false, message: "no such username" };
    }
  }
}

export class BusinessAuthService {
  constructor(private knex: Knex) {}
  async businessLogin(
    businessNameInput: string,
    businessPasswordInput: string
  ) {
    let businessLoginInfo = await this.knex
      .select("*")
      .from("shops")
      .where("login_name", businessNameInput);
    if (businessLoginInfo.length > 0) {
      let password_hash = businessLoginInfo[0].login_password;
      let compareResult = await comparePassword(
        businessPasswordInput,
        password_hash
      );
      if (compareResult) {
        console.log("success");
        //login successful, create JWT and send to user's device
        const payload = {
          id: businessLoginInfo[0].id,
          username: businessLoginInfo[0].login_name,
        };
        const token = jwtSimple.encode(payload, jwt.jwtSecret);
        return { flag: true, message: "success", token: token };
      } else {
        return { flag: false, message: "wrong password" };
      }
    } else {
      return { flag: false, message: "no such username" };
    }
  }
}
