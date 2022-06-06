import express, { NextFunction, Request, Response } from "express";
import phraseRoutes from "./routes/Phrase";

const app = express();
const port = process.env.PORT || 8000;

app.get("/ping", (req: Request, res: Response, next: NextFunction) =>
  res.json({ message: "pong" })
);

app.use("/phrase", phraseRoutes);

app.listen(port, (): void => console.log(`Server Listening on port ${port}`));
