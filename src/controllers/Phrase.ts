import { NextFunction, Request, Response } from "express";
import Phrase from "../models/Phrase";

// Fetch 1 phrase from the database
export const getPhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "/:id" });
};

// Fetch all phrase from the database
export const getAllPhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPhrases = await Phrase.find();
    return res.status(200).json({ phrase: allPhrases });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a new phrase in the database
export const createPhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { words } = req.body;

  const phrase = new Phrase({ words });
  await phrase.save();
  res.json({ message: "Phrase created", phrase });
};

// Update a phrase in the database
export const updatePhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "/update" });
};

// Delete a phrase from the database
export const deletePhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "/delete" });
};
