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

// @desc    Get Top Reviews (4 & 5 Stars only)
// @route   GET /api/reviews/top
const getTopReviews = async (req, res) => {
  try {
    // Filter: Rating must be greater than or equal to 4
    // Sort: Newest first
    // Limit: Show max 6 reviews
    const reviews = await Review.find({ rating: { $gte: 4 } })
                                .sort({ createdAt: -1 })
                                .limit(6); 
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createReview, getTopReviews };