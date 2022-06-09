import { NextFunction, Request, Response } from "express";
import Phrase from "../models/Phrase";

// Fetch 1 phrase from the database
export const getPhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const phrase = await Phrase.findOne({ _id: id, owner: req?.user?._id });
    if (!phrase) throw new Error("Phrase not found.");

    return res.status(200).json({ phrase });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Fetch all phrase from the database
export const getAllPhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await req?.user?.populate("userPhrases");
    const allPhrases = req?.user?.userPhrases;

    if (!allPhrases || allPhrases.length == 0)
      throw new Error("No phrases found");

    return res.status(200).json({ phrases: allPhrases });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Create a new phrase in the database
export const createPhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { words } = req.body;
    if (!words) throw new Error("No words provided.");

    const isUnderFour = /^(?:\b\w+\b[\s\r\n]*){1,3}$/.test(words.trim());
    if (!isUnderFour) throw new Error("Maximum of 3 words allowed.");

    const phrase = new Phrase({ words, owner: req?.user?._id });
    await phrase.save();

    return res.status(201).json({ message: "Phrase created.", phrase });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Update a phrase in the database
export const updatePhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { words } = req.body;
    if (!words) throw new Error("No words provided to update.");

    const isUnderFour = /^(?:\b\w+\b[\s\r\n]*){1,3}$/.test(words.trim());
    if (!isUnderFour) throw new Error("Maximum of 3 words allowed.");

    const phrase = await Phrase.findOne({ _id: id, owner: req?.user?._id });
    if (!phrase) throw new Error("Phrase not found.");

    phrase.set({ words });
    await phrase.save();

    return res.status(200).json({ message: "Phrase updated.", phrase });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// Delete a phrase from the database
export const deletePhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const phrase = await Phrase.findOne({ _id: id, owner: req?.user?._id });
    if (!phrase) throw new Error("Phrase not found to delete.");

    await phrase.remove();

    return res.status(200).json({ message: "Phrase deleted." });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: "Something went wrong." });
  }
};
