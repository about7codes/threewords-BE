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
    if (!email || !password) throw new Error("Email and password are required");

    const user = await User.create({ email, password });
    user.set({ password: undefined });

    const authToken = user.generateAuthToken();

    return res.status(201).json({
      message: "User created successfully",
      authToken,
      user,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
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
    if (!email || !password) throw new Error("Email and password are required");

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
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
  }
};
