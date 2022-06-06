import { NextFunction, Request, Response } from "express";

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
  res.json({ message: "/all" });
};

// Create a new phrase in the database
export const createPhrase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ message: "/new" });
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
