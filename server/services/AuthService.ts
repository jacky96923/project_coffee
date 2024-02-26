import { Knex } from "knex";
import { comparePassword, hashPassword } from "../utils/hash";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";
import { start } from "repl";

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
        console.log("login success");
        //login successful, create JWT and send to user's device
        const payload = {
          type: "client",
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
  async userRegister(
    name: string,
    email: string,
    confirmPassword: string,
    contactNo: string
  ) {
    try {
      const result = await this.knex
        .insert({
          login_name: name,
          email: email,
          login_password: await hashPassword(confirmPassword),
          contact_no: contactNo,
          reward_points: 0,
        })
        .into("users")
        .returning("*");
      console.log(result);
      return this.userLogin(result[0].login_name, confirmPassword);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }

  async hasEmail(email: string) {
    try {
      const existingEmail = await this.knex.select("email").from("users");
      //console.log(existingEmail)
      return existingEmail.some((user) => user.email === email);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }

  async hasContactNo(contactNo: string) {
    try {
      const existingContactNo = await this.knex
        .select("contact_no")
        .from("users");
      //console.log(existingContactNo)
      return existingContactNo.some((user) => user.contact_no === contactNo);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }
}

import { Knex } from "knex";
import { comparePassword, hashPassword } from "../utils/hash";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";
import { start } from "repl";

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
        console.log("login success");
        //login successful, create JWT and send to user's device
        const payload = {
          type: "client",
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
  async userRegister(
    name: string,
    email: string,
    confirmPassword: string,
    contactNo: string
  ) {
    try {
      const result = await this.knex
        .insert({
          login_name: name,
          email: email,
          login_password: await hashPassword(confirmPassword),
          contact_no: contactNo,
          reward_points: 0,
        })
        .into("users")
        .returning("*");
      console.log(result);
      return this.userLogin(result[0].login_name, confirmPassword);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }

  async hasEmail(email: string) {
    try {
      const existingEmail = await this.knex.select("email").from("users");
      //console.log(existingEmail)
      return existingEmail.some((user) => user.email === email);
    } catch (error) {
      console.error("error:", error);
      return error;
    }
  }

  async hasContactNo(contactNo: string) {
    try {
      const existingContactNo = await this.knex
        .select("contact_no")
        .from("users");
      //console.log(existingContactNo)
      return existingContactNo.some((user) => user.contact_no === contactNo);
    } catch (error) {
      console.error("error:", error);
      return error;
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
          type: "business",
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
  async businessRegister(
    shopName: string,
    contactNo: string,
    area: string,
    district: string,
    address: string,
    description: string,
    loginName: string,
    loginPassword: string,
    latitude: number,
    longitude: number
  ) {
    try {
      return await this.knex
        .insert({
          shop_name: shopName,
          contact_no: contactNo,
          area: area,
          district: district,
          address: address,
          description: description,
          login_name: loginName,
          login_password: await hashPassword(loginPassword),
          latitude: latitude,
          longitude: longitude,
        })
        .into("shops")
        .returning("*");
    } catch (error) {
      console.error("error:", error);
    }
//     async shopopentime(
//       openday: string,
//       opentime: number,
//       try {
//         return await this.knex
//           .insert({
// day: openday,
// start_time: opentime,
// end_time: closetime,  
//           })
//           .into("opening_days")
//           .returning("*");
//       } catch (error) {
//         console.error("error:", error);
//       }
    // )
  }
}
