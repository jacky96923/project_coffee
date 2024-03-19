"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const permit_1 = require("permit");
const jwt_1 = __importDefault(require("./jwt"));
const permit = new permit_1.Bearer({
    query: "access_token",
});
function isLoggedIn(req, res, next) {
    try {
        // check jwt validity in the request
        // get the jwt in request
        const token = permit.check(req);
        if (!token) {
            throw Error();
        }
        console.log("isLoggedIn before decode");
        const decoded = jwt_simple_1.default.decode(token, jwt_1.default.jwtSecret);
        req.body.user_id = decoded.id;
        req.body.type = decoded.type;
        console.log("Check decoded", decoded);
        next();
        // success verify , next
        // else resp error
    }
    catch (error) {
        res.status(401).json({ msg: "Permission denied. Please login first" });
    }
}
exports.isLoggedIn = isLoggedIn;
