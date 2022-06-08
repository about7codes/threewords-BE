import express from "express";
import {
  getPhrase,
  getAllPhrase,
  createPhrase,
  updatePhrase,
  deletePhrase,
} from "../controllers/Phrase";
import auth from "../middleware/auth";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

// Authenticate user before accessing all Phrase routes
router.use(auth);

router.get("/all", getAllPhrase);
router.get("/:id", getPhrase);
router.post("/new", ValidateSchema(Schemas.Phrase.create), createPhrase);
router.patch(
  "/update/:id",
  ValidateSchema(Schemas.Phrase.update),
  updatePhrase
);
router.delete("/delete/:id", deletePhrase);

export default router;
