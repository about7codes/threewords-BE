import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { IUser } from "../models/User";
import { IPhrase } from "../models/Phrase";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: "Something went wrong." });
    }
  };
};

export const Schemas = {
  User: {
    signup: Joi.object<IUser>({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email is invalid.",
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters.",
      }),
    }),
    signin: Joi.object<IUser>({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Email is invalid.",
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters.",
      }),
    }),
  },
  Phrase: {
    create: Joi.object<IPhrase>({
      words: Joi.string().trim().min(1).max(50).required().messages({
        "string.min": "Min 1 character is required.",
        "string.max": "Max 50 characters is allowed.",
        "string.empty": "Min 1 character is required.",
      }),
    }),
    update: Joi.object<IPhrase>({
      words: Joi.string().trim().min(1).max(50).required().messages({
        "string.min": "Min 1 character is required.",
        "string.max": "Max 50 characters is allowed.",
        "string.empty": "Min 1 character is required.",
      }),
    }),
  },
};
