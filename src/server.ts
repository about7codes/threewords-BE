import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import "./helpers/db";
import { config } from "./config/config";
import phraseRoutes from "./routes/Phrase";
import userRoutes from "./routes/User";

const app = express();

// Server ping route
app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.json({ message: "Hello fellow developer." })
);
// Server ping route
app.get("/ping", (req: Request, res: Response, next: NextFunction) =>
  res.json({ message: "pong" })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/phrase", phraseRoutes);
app.use("/auth", userRoutes);

app.listen(config.server.port, (): void =>
  console.log(`Server Listening on port ${config.server.port}`)
);
