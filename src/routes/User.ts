import express from "express";
import {
  signin,
  signup,
  sendTokens,
  getUserProfile,
} from "../controllers/User";
import auth from "../middleware/auth";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/signup", ValidateSchema(Schemas.User.signup), signup);
router.post("/signin", ValidateSchema(Schemas.User.signin), signin);

router.get("/tokens", sendTokens);

router.get("/me", auth, getUserProfile);

export default router;
