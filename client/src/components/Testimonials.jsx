import { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(null); 
  
  // Check login status directly
  const token = localStorage.getItem('token');

  // Fetch Top Reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get('/reviews/top');
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews");
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/reviews', { rating, comment });
      toast.success('Review Submitted! Thank you.');
      setComment('');
      setRating(5);
      
      if (data.rating >= 4) {
          setReviews([data, ...reviews].slice(0, 6)); 
      }
    } catch (error) {
      toast.error('Failed to submit review.');
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* --- SECTION TITLE --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What Travelers Say</h2>
          <p className="text-gray-500 mt-2">Real stories from our happy customers.</p>
        </div>

        {/* --- REVIEWS GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative">
              <FaQuoteLeft className="text-4xl text-orange-100 absolute top-4 right-4" />
              <div className="flex gap-1 text-yellow-400 mb-3">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
              <div className="font-bold text-gray-800">- {review.name}</div>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-center col-span-3 text-gray-400">No reviews yet.</p>}
        </div>

        {/* --- WRITE A REVIEW FORM (ONLY VISIBLE IF LOGGED IN) --- */}
        {token && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-50">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Leave a Review</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Star Rating Selector */}
              <div className="flex flex-col items-center gap-2">
                <label className="font-bold text-gray-600">Rate your experience</label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input 
                          type="radio" name="rating" className="hidden" 
                          value={currentRating} onClick={() => setRating(currentRating)}
                        />
                        <FaStar 
                          className="cursor-pointer transition duration-200" 
                          size={30} 
                          color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                          onMouseEnter={() => setHover(currentRating)} 
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Text Area */}
              <div>
                <textarea 
                  placeholder="Tell us about your trip..." 
                  required 
                  rows="4"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow transition transform hover:-translate-y-1">
                Submit Review
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Testimonials;