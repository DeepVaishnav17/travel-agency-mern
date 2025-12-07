const Review = require('../models/Review');

// @desc    Create a new review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Ensure user is logged in (req.user comes from protect middleware)
    const newReview = await Review.create({
      name: req.user.name,
      user: req.user._id,
      rating,
      comment
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit review' });
  }
};

// @desc    Get Top Reviews (Public - 4 & 5 Stars only)
// @route   GET /api/reviews/top
const getTopReviews = async (req, res) => {
  try {
    // Filter: Rating >= 4, Sort: Newest first, Limit: 6
    const reviews = await Review.find({ rating: { $gte: 4 } })
                                .sort({ createdAt: -1 })
                                .limit(6); 
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get All Reviews (Admin Only)
// @route   GET /api/reviews
const getAllReviews = async (req, res) => {
  try {
    // No filter, just sort by newest (Shows all stars)
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete Review (Admin Only)
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (review) {
      await review.deleteOne();
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Export all 4 functions to be used in reviewRoutes.js
module.exports = { createReview, getTopReviews, getAllReviews, deleteReview };