import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";

// Add a new review
const addReview = async (req, res) => {
    try {
        const { userId, productId, rating, comment } = req.body;
        
        // Get user name from database
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const reviewData = {
            userId,
            userName: user.name,
            productId,
            rating: Number(rating),
            comment,
            date: new Date()
        };
        
        const review = new reviewModel(reviewData);
        await review.save();
        
        res.json({ success: true, message: "Review added successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.body;
        
        const reviews = await reviewModel.find({ productId }).sort({ date: -1 }); // Newest first
        
        res.json({ success: true, reviews });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get average rating for a product
const getProductRating = async (req, res) => {
    try {
        const { productId } = req.body;
        
        const reviews = await reviewModel.find({ productId });
        
        if (reviews.length === 0) {
            return res.json({ success: true, averageRating: 0, totalReviews: 0 });
        }
        
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        
        res.json({ 
            success: true, 
            averageRating: Number(averageRating.toFixed(1)), 
            totalReviews: reviews.length 
        });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.body;
        const userId = req.body.userId;
        
        if (!reviewId) {
            return res.json({ success: false, message: "Review ID is required" });
        }
        
        // Find the review
        const review = await reviewModel.findById(reviewId);
        if (!review) {
            return res.json({ success: false, message: "Review not found" });
        }
        
        // Verify ownership (only the reviewer can delete their review)
        if (review.userId !== userId) {
            return res.json({ success: false, message: "Not authorized to delete this review" });
        }
        
        // Delete the review
        await reviewModel.findByIdAndDelete(reviewId);
        
        res.json({ success: true, message: "Review deleted successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addReview, getProductReviews, getProductRating, deleteReview };
