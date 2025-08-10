import { getAllMovieList, getMovieByTitle } from "../controllers/movie.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getAllMovieList);
router.get("/:title", getMovieByTitle);

export default router;