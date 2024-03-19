"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.JWT_SECRET)
    throw Error(".env 's SECRET is absent, please fill in");
exports.default = {
    jwtSecret: process.env.JWT_SECRET,
    jwtSession: {
        session: false,
    },
};
