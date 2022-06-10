import express from "express";
import {
  getPhrase,
  getAllPhrase,
  createPhrase,
  updatePhrase,
  deletePhrase,
  phraseById,
} from "../controllers/Phrase";
import auth from "../middleware/auth";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

// Authenticate user before accessing all Phrase routes
router.use(auth);

router.get("/all", getAllPhrase);
router.get("/:phraseId", getPhrase);
router.post("/new", ValidateSchema(Schemas.Phrase.create), createPhrase);
router.patch(
  "/update/:phraseId",
  ValidateSchema(Schemas.Phrase.update),
  updatePhrase
);
router.delete("/delete/:phraseId", deletePhrase);

router.param("phraseId", phraseById);

export default router;
