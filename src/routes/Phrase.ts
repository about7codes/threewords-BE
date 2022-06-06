import express from "express";
import {
  createPhrase,
  deletePhrase,
  getAllPhrase,
  getPhrase,
  updatePhrase,
} from "../controllers/Phrase";

const router = express.Router();

router.get("/all", getAllPhrase);
router.get("/:id", getPhrase);
router.post("/new", createPhrase);
router.patch("/update/:id", updatePhrase);
router.delete("/delete/:id", deletePhrase);

export default router;
