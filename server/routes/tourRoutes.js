const express = require('express');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const { checkAdminKey } = require('../middleware/adminAuth');
const router = express.Router();

router.route('/')
  .get(getTours)
  .post(checkAdminKey, createTour);

router.route('/:id')
  .get(getTourById)
  .put(checkAdminKey, updateTour)
  .delete(checkAdminKey, deleteTour);

module.exports = router;