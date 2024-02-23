import { Request, Response, NextFunction } from "express";
import jwtSimple from "jwt-simple";
import { Bearer } from "permit";
import jwt from "./jwt";

const permit = new Bearer({
  query: "access_token",
});

type UserType = {
  id: number;
  username: string;
  password: string;
};

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  try {
    // check jwt validity in the request

    // get the jwt in request
    const token = permit.check(req);

    if (!token) {
      throw Error();
    }
    console.log("isLoggedIn before decode");
    const decoded: Omit<UserType, "password"> = jwtSimple.decode(
      token,
      jwt.jwtSecret
    );

    req.body.user_id = decoded.id;

    console.log("Check decoded", decoded);

    next();
    // success verify , next
    // else resp error
  } catch (error) {
    res.status(401).json({ msg: "Permission denied. Please login first" });
  }
}