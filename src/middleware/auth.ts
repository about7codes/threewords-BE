import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import User, { IUserModel } from "../models/User";
import { IPhraseModel } from "../models/Phrase";

declare module "express" {
  export interface Request {
    authToken?: string;
    user?: IUserModel;
    phrase?: IPhraseModel;
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.header("Authorization")?.split(" ")[1];
    if (!authToken) throw new Error("No token provided.");

    const decodedToken = <JwtPayload>(
      jwt.verify(authToken, config.server.jwtSecret)
    );
    if (!decodedToken) throw new Error("Invalid token.");

    const user = await User.findById(decodedToken.id);
    if (!user) throw new Error("Please login again.");

    req.authToken = authToken;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export default auth;
