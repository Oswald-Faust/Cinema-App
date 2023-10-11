import express from "express";
import * as moviesController from "../controllers/movieController.js";
import { protect, admin } from "../middleware/Auth.js";

const router = express.Router();

router.get("/", moviesController.getMovies);
router.post("/", protect, admin, moviesController.createMovie);
router.delete("/:id", protect, admin, moviesController.deleteMovie);
router.delete("/", protect, admin, moviesController.deleteAllMovies);
router.put("/:id", protect, admin, moviesController.updateMovie)
router.get("/:id", moviesController.getMoviesbyId )
router.get("/random/all", moviesController.getRandomMovies);
router.post("/import", moviesController.importMovie);

export default router