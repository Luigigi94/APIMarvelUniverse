import { Router } from "express";
import { addReview, listMovieReviews } from "../controllers/review.controller.js";

const router = Router();

router.post("/review", addReview);

router.get("/reviews/:idOrTitle", listMovieReviews);

export default router;