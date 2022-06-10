import { NextFunction, Request, Response } from "express";
import User from "../models/User";

// Create a new User
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists.");

    const user = await User.create({ email, password });
    user.set({ password: undefined });

    const authToken = user.generateAuthToken();

    return res.status(201).json({
      message: "User created successfully",
      authToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Login a User
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.schema.methods.findByCredentials(email, password);
    if (!user) throw new Error("User does not exist");

    user.set({ password: undefined });

    const authToken = user.generateAuthToken();

    return res.status(201).json({
      message: "User logged in successfully",
      authToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};
