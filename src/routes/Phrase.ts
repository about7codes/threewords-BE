import express from "express";
import {
  createPhrase,
  deletePhrase,
  getAllPhrase,
  getPhrase,
  updatePhrase,
} from "../controllers/Phrase";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

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
