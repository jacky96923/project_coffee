"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessAuthService = exports.UserAuthService = void 0;
const hash_1 = require("../utils/hash");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const jwt_1 = __importDefault(require("../utils/jwt"));
class UserAuthService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async userLogin(userNameInput, userPasswordInput) {
        let userLoginInfo = await this.knex
            .select("*")
            .from("users")
            .where("login_name", userNameInput);
        if (userLoginInfo.length > 0) {
            let password_hash = userLoginInfo[0].login_password;
            let compareResult = await (0, hash_1.comparePassword)(userPasswordInput, password_hash);
            if (compareResult) {
                console.log("login success");
                //login successful, create JWT and send to user's device
                const payload = {
                    type: "client",
                    id: userLoginInfo[0].id,
                    username: userLoginInfo[0].login_name,
                };
                const token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                return { flag: true, message: "success", token: token };
            }
            else {
                return { flag: false, message: "wrong password" };
            }
        }
        else {
            return { flag: false, message: "no such username" };
        }
    }
    async userRegister(name, email, confirmPassword, contactNo) {
        try {
            const result = await this.knex
                .insert({
                login_name: name,
                email: email,
                login_password: await (0, hash_1.hashPassword)(confirmPassword),
                contact_no: contactNo,
                reward_points: 0,
            })
                .into("users")
                .returning("*");
            console.log(result);
            return this.userLogin(result[0].login_name, confirmPassword);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
    async hasEmail(email) {
        try {
            const existingEmail = await this.knex.select("email").from("users");
            //console.log(existingEmail)
            return existingEmail.some((user) => user.email === email);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
    async hasContactNo(contactNo) {
        try {
            const existingContactNo = await this.knex
                .select("contact_no")
                .from("users");
            //console.log(existingContactNo)
            return existingContactNo.some((user) => user.contact_no === contactNo);
        }
        catch (error) {
            console.error("error:", error);
            return error;
        }
    }
}
exports.UserAuthService = UserAuthService;
class BusinessAuthService {
    knex;
    constructor(knex) {
        this.knex = knex;
    }
    async businessLogin(businessNameInput, businessPasswordInput) {
        let businessLoginInfo = await this.knex
            .select("*")
            .from("shops")
            .where("login_name", businessNameInput);
        if (businessLoginInfo.length > 0) {
            let password_hash = businessLoginInfo[0].login_password;
            let compareResult = await (0, hash_1.comparePassword)(businessPasswordInput, password_hash);
            if (compareResult) {
                console.log("success");
                //login successful, create JWT and send to user's device
                const payload = {
                    type: "business",
                    id: businessLoginInfo[0].id,
                    username: businessLoginInfo[0].login_name,
                };
                const token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                return { flag: true, message: "success", token: token };
            }
            else {
                return { flag: false, message: "wrong password" };
            }
        }
        else {
            return { flag: false, message: "no such username" };
        }
    }
    async businessRegister(shopName, contactNo, area, district, address, description, loginName, loginPassword, latitude, longitude) {
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
                login_password: await (0, hash_1.hashPassword)(loginPassword),
                latitude: latitude,
                longitude: longitude,
            })
                .into("shops")
                .returning("*");
        }
        catch (error) {
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
exports.BusinessAuthService = BusinessAuthService;
