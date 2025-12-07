const express = require('express');
// ✅ Import new controller functions
const { createReview, getTopReviews, getAllReviews, deleteReview } = require('../controllers/reviewController');
// ✅ Import 'admin' middleware
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public / User Routes
router.post('/', protect, createReview); // User creates review
router.get('/top', getTopReviews);       // Public gets top reviews

// ✅ NEW: Admin Routes
// Admin can see ALL reviews (even low rated ones) and delete them
router.get('/', protect, admin, getAllReviews);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;