const Review = require('../models/Review');


const createReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    console.log('[Review] Create Request:', req.body);

    const newReview = await Review.create({
      name: name || 'Anonymous',
      rating,
      comment
    });

    console.log('[Review] Created:', newReview._id);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('[Review] Error:', error.message);
    res.status(400).json({ message: 'Failed to submit review', error: error.message });
  }
};


const getTopReviews = async (req, res) => {
  try {

    const reviews = await Review.find({ rating: { $gte: 4 } })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const getAllReviews = async (req, res) => {
  try {

    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


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


module.exports = { createReview, getTopReviews, getAllReviews, deleteReview };