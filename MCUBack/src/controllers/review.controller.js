import { ReviewService } from "../services/review.service.js";

export const addReview = async (req, res, next) =>{
    try{
        console.log("body ",req.body);
        const review = await ReviewService.addReview(req.body);
        res.status(201).json({ok: true, review});
    } catch (err) {
        next(err);
    }
}

export const listMovieReviews = async (req, res, next) =>{
    try {
        const { titleOrId } = req.params;

        const result = await ReviewService.addReview(titleOrId);
        res.status(200).json({ok: true, result});
    } catch (err){
        next(err);
    }
}

export const getAllReviews = async (req, res, next) =>{

}

//G7105449474