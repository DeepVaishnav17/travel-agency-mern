const express = require('express');
// ✅ Import new controller functions
const { createReview, getTopReviews, getAllReviews, deleteReview } = require('../controllers/reviewController');
// ✅ Import 'admin' middleware
const { checkAdminKey } = require('../middleware/adminAuth');

const router = express.Router();

// Public / User Routes
router.post('/', createReview); // User creates review (Public)
router.get('/top', getTopReviews);       // Public gets top reviews

// ✅ Admin Routes
// Admin can see ALL reviews (even low rated ones) and delete them
router.get('/', checkAdminKey, getAllReviews);
router.delete('/:id', checkAdminKey, deleteReview);

module.exports = router;