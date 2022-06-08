import express from "express";
import { signin, signup } from "../controllers/User";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/signup", ValidateSchema(Schemas.User.signup), signup);
router.post("/signin", ValidateSchema(Schemas.User.signin), signin);

export default router;
