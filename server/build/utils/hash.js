"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const saltRounds = 10;
async function hashPassword(password_input) {
    let hashed = await (0, bcryptjs_1.hash)(password_input, saltRounds);
    return hashed;
}
exports.hashPassword = hashPassword;
async function comparePassword(password_input, login_password) {
    let result = await (0, bcryptjs_1.compare)(password_input, login_password);
    return result;
}
exports.comparePassword = comparePassword;
