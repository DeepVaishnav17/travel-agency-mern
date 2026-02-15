import { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(null);
  const [name, setName] = useState('');

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
      const { data } = await api.post('/reviews', { name, rating, comment });
      toast.success('Review Submitted! Thank you.');
      setComment('');
      setName('');
      setRating(5);
      if (data.rating >= 4) {
        setReviews([data, ...reviews].slice(0, 6));
      }
    } catch (error) {
      toast.error('Failed to submit review.');
    }
  };

  return (
    <div className="bg-white py-24 border-t border-gray-50">
      <div className="container mx-auto px-6">

        {/* --- SECTION TITLE --- */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Testimonials</span>
          <h2 className="text-4xl font-bold text-gray-900">What Travelers Say</h2>
        </div>

        {/* --- REVIEWS GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-8 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-100 relative hover:-translate-y-2 transition-transform duration-300">
              <FaQuoteLeft className="text-4xl text-purple-100 absolute top-8 right-8" />
              <div className="flex gap-1 text-accent mb-4">
                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 font-light">"{review.comment}"</p>
              <div className="font-bold text-gray-900 border-l-4 border-primary pl-4">{review.name}</div>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-center col-span-3 text-gray-400 font-light">No reviews yet. Be the first!</p>}
        </div>

        {/* --- WRITE A REVIEW FORM --- */}
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Share Your Experience</h3>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name Input */}
            <div>
              <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-gray-50 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Star Rating Selector */}
            <div className="flex flex-col items-center gap-3">
              <label className="font-bold text-gray-700 text-sm uppercase tracking-wide">Rate your experience</label>
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
                        size={32}
                        color={currentRating <= (hover || rating) ? "#F59E0B" : "#E5E7EB"}
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
                className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none bg-gray-50 transition-all"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button className="w-full bg-primary hover:bg-purple-800 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1">
              Submit Review
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;