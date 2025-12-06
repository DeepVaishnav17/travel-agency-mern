const express = require('express');
const { getTours, getTourById, createTour, deleteTour } = require('../controllers/tourController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getTours).post(protect, admin, createTour);
router.route('/:id').get(getTourById).delete(protect, admin, deleteTour);

module.exports = router;