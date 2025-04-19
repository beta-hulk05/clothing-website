import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Title from './Title';

const StarRating = ({ rating, setRating, editable = false }) => {
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
          className={`w-5 h-5 cursor-pointer ${
            index < rating ? 'text-yellow-500' : 'text-gray-300'
          } ${editable ? 'cursor-pointer' : ''}`}
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

const ReviewSection = ({ productId }) => {
  const { backendUrl, token } = useContext(ShopContext);
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
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <Title text1="CUSTOMER" text2="REVIEWS" />
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <StarRating rating={Math.round(averageRating)} setRating={() => {}} />
            <span className="ml-2 text-sm text-gray-700">{averageRating} out of 5</span>
          </div>
          <span className="text-sm text-gray-600">({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})</span>
        </div>
      </div>

      {!showForm && token && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all text-sm font-medium"
        >
          Write a Review
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Rating
            </label>
            <StarRating rating={rating} setRating={setRating} editable={true} />
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500"
              placeholder="Share your thoughts about this product..."
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition-all text-sm font-medium disabled:opacity-70"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{review.userName}</p>
                  <div className="flex items-center mt-1">
                    <StarRating rating={review.rating} setRating={() => {}} />
                    <span className="ml-2 text-xs text-gray-500">{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
