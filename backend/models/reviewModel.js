import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Remove the unique constraint by explicitly defining the index as non-unique
// This will only take effect once the existing index is dropped
reviewSchema.index({ userId: 1, productId: 1 }, { unique: false });

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);
export default reviewModel;
