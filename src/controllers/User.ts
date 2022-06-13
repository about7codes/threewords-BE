import { NextFunction, Request, Response } from "express";
import { verifyRefreshToken } from "../middleware/auth";
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
    const refreshToken = user.generateRefreshToken();

    return res.status(201).json({
      message: "User created successfully",
      refreshToken,
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
    const refreshToken = user.generateRefreshToken();

    return res.status(201).json({
      message: "User logged in successfully",
      refreshToken,
      authToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Profile
export const getUserProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    if (!user) throw new Error("User not found.");

    const extraInfo: string[] = user.email.split("@");
    console.log(extraInfo);

    user.set({ password: undefined });

    return res.status(200).json({
      message: "User profile retrieved successfully.",
      user: {
        ...user.toObject(),
        username: extraInfo[0],
        emailProvider: extraInfo[1],
      },
    });
  } catch (error) {
    next(error);
  }
};

// Send Tokens
export const sendTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refToken = req.header("Authorization")?.split(" ")[1];
    if (!refToken) throw new Error("No token provided.");

    const decodedToken = await verifyRefreshToken(refToken);
    const user = await User.findById(decodedToken.id);
    if (!user) throw new Error("User not found.");

    const authToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    user.set({ password: undefined });

    return res.json({
      message: "Tokens sent successfully.",
      refreshToken,
      authToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};
