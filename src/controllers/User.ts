import { NextFunction, Request, Response } from "express";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("signup");
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("signin");
};
