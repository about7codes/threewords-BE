import mongoose from "mongoose";
import { config } from "../config/config";

mongoose
  .connect(config.mongo.url, { dbName: config.mongo.dbname })
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log(err));
