import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET)
  throw Error(".env 's SECRET is absent, please fill in");
export default {
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {
    session: false,
  },
};
