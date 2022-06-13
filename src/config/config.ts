import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DB_NAME = process.env.DB_NAME || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.wc4xq.mongodb.net/`;

const SERVER_PORT = process.env.PORT || 8001;
const JWT_AUTH_SECRET = process.env.JWT_AUTH_SECRET || "";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";

export const config = {
  mongo: {
    url: MONGO_URL,
    dbname: MONGO_DB_NAME,
  },
  server: {
    port: SERVER_PORT,
    jwtAuthSecret: JWT_AUTH_SECRET,
    jwtRefreshSecret: JWT_REFRESH_SECRET,
  },
};
