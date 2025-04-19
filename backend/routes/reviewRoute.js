import express from 'express';
import { addReview, getProductReviews, getProductRating, deleteReview } from '../controllers/reviewController.js';
import authUser from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', authUser, addReview);
reviewRouter.post('/product', getProductReviews);
reviewRouter.post('/rating', getProductRating);
reviewRouter.post('/delete', authUser, deleteReview);

export default reviewRouter;
