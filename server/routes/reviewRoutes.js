const express = require('express');

const { createReview, getTopReviews, getAllReviews, deleteReview } = require('../controllers/reviewController');

const { checkAdminKey } = require('../middleware/adminAuth');

const router = express.Router();


router.post('/', createReview);
router.get('/top', getTopReviews);


router.get('/', checkAdminKey, getAllReviews);
router.delete('/:id', checkAdminKey, deleteReview);

module.exports = router;