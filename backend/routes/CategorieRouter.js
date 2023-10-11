import express from "express";
import * as categorieController from   "../controllers/categorieController.js";
import { protect, admin } from "../middleware/Auth.js";

const router = express.Router();

router.get("/", categorieController.getCategories);
router.post("/", protect, admin, categorieController.createCategory );
router.put("/:id", protect, admin, categorieController.updateCategory);
router.delete("/:id", protect, admin, categorieController.deleteCategory);

export default router