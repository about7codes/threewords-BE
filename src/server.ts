import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import "./helpers/db";
import { config } from "./config/config";
import phraseRoutes from "./routes/Phrase";
import userRoutes from "./routes/User";
import ErrorHandler from "./middleware/errorHandler";

const app = express();

// Server ping route
app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.json({ message: "Hello fellow developer." })
);
// Server ping route
app.get("/ping", (req: Request, res: Response, next: NextFunction) =>
  res.json({ message: "pong" })
);

// Express config middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "https://threemax.onrender.com",
      "https://threemax.netlify.app",
      "https://threemax.netlify.com",
      "https://threemax.vercel.app",
      "https://threemax.vercel.com",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Routes
app.use("/phrase", phraseRoutes);
app.use("/auth", userRoutes);

// 404 route handler
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler middleware
app.use(ErrorHandler);

// Start server
app.listen(config.server.port, (): void =>
  console.log(`Server Listening on port ${config.server.port}`)
);
