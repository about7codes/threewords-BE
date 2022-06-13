import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "../config/config";
import { IPhraseModel } from "../models/Phrase";
import User, { IUserModel } from "../models/User";

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
      jwt.verify(authToken, config.server.jwtAuthSecret)
    );
    if (!decodedToken) throw new Error("Invalid token.");

    const user = await User.findById(decodedToken.id);
    if (!user) throw new Error("Please login again.");

    req.authToken = authToken;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyRefreshToken = (
  refreshToken: string
): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.server.jwtRefreshSecret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as any);
    });
  });
};

export default auth;
