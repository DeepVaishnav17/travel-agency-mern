const express = require('express');
const { createReview, getTopReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createReview); // Must be logged in to write
router.get('/top', getTopReviews);       // Public can read

module.exports = router;