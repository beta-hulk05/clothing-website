import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Title from './Title';

// Enhanced star rating component with hover effects
const StarRating = ({ rating, setRating, editable = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (index) => {
    if (editable) {
      setRating(index + 1);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={editable ? () => setHoverRating(index + 1) : undefined}
          onMouseLeave={editable ? () => setHoverRating(0) : undefined}
          className={`w-5 h-5 ${
            editable ? 'cursor-pointer transition-all duration-150 transform hover:scale-110' : ''
          } ${
            (hoverRating ? index < hoverRating : index < rating) 
              ? 'text-yellow-400 drop-shadow-sm' 
              : 'text-gray-300'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
};

const ReviewSection = ({ productId, refreshReviewStats }) => {
  const { backendUrl, token, userData } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/review/product`, { productId });
      
      if (response.data.success) {
        setReviews(response.data.reviews);
      }
      
      // Get average rating
      const ratingResponse = await axios.post(`${backendUrl}/api/review/rating`, { productId });
      
      if (ratingResponse.data.success) {
        setAverageRating(ratingResponse.data.averageRating);
        setTotalReviews(ratingResponse.data.totalReviews);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  // Add a console log to debug userData
  useEffect(() => {
    if (userData) {
      console.log("Current user data:", userData);
    }
  }, [userData]);

  // Helper function to check if a review belongs to the current user
  const isUserReview = (review) => {
    return userData && userData._id === review.userId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }
    
    if (rating < 1 || !comment.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }
    
    try {
      setSubmitting(true);
      const response = await axios.post(
        `${backendUrl}/api/review/add`,
        { productId, rating, comment },
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setComment('');
        setRating(5);
        setShowForm(false);
        loadReviews(); // Refresh reviews
        
        // Also refresh the review stats in the parent component if available
        if (refreshReviewStats) {
          refreshReviewStats();
        }
      } else {
        toast.error(response.data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-24 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header section with title and stats */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
          <p className="text-sm text-gray-500 mt-1">
            See what our customers are saying about this product
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
            <StarRating rating={Math.round(averageRating)} setRating={() => {}} />
            <div className="text-xs text-gray-500 mt-1">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</div>
          </div>
          
          <div className="h-12 w-px bg-gray-200 mx-2"></div>
          
          {!showForm && token && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all text-sm font-medium flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Review
            </button>
          )}
        </div>
      </div>

      {/* Review form */}
      {showForm && (
        <div className="px-6 py-6 bg-gray-50 border-b border-gray-100">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write Your Review
            </h3>
            
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Your Rating
              </label>
              <div className="bg-white p-3 rounded-lg border border-gray-200 inline-block">
                <StarRating rating={rating} setRating={setRating} editable={true} />
              </div>
            </div>
            
            <div className="mb-5">
              <label htmlFor="comment" className="block text-gray-700 text-sm font-medium mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all resize-none"
                placeholder="Share your experience with this product..."
                required
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Your review helps other shoppers make better decisions</p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-sm transition-all text-sm font-medium disabled:opacity-70 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews list */}
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="animate-spin h-10 w-10 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-10 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Reviews Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This product hasn't received any reviews yet. Be the first to share your experience!
            </p>
            
            {token && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-6 inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Write a Review
              </button>
            )}
          </div>
        ) : (
          <div>
            {/* Reviews filtering/sorting options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'} for this product</p>
            </div>
            
            {/* Reviews list */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {review.userName}
                              {isUserReview(review) && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">You</span>}
                            </p>
                            <div className="flex items-center mt-0.5 gap-1.5">
                              <StarRating rating={review.rating} setRating={() => {}} />
                              <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Always show delete button for user's own reviews */}
                      {isUserReview(review) && token && (
                        <button 
                          onClick={async () => {
                            if (window.confirm("Are you sure you want to delete this review?")) {
                              try {
                                const response = await axios.post(
                                  `${backendUrl}/api/review/delete`,
                                  { reviewId: review._id },
                                  { headers: { token } }
                                );
                                
                                if (response.data.success) {
                                  toast.success("Review deleted successfully");
                                  loadReviews();
                                  if (refreshReviewStats) {
                                    refreshReviewStats();
                                  }
                                } else {
                                  toast.error(response.data.message || "Failed to delete review");
                                }
                              } catch (error) {
                                console.error("Delete review error:", error);
                                toast.error("Failed to delete review");
                              }
                            }
                          }}
                          className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 border border-red-200 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="text-xs font-medium">Delete</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-4 text-gray-700">{review.comment}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination would go here in the future */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
