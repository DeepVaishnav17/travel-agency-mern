const Tour = require('../models/Tour');

// @desc    Get all tours
// @route   GET /api/tours
const getTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
const getTourById = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (tour) res.json(tour);
  else res.status(404).json({ message: 'Tour not found' });
};

// @desc    Create a tour (Admin)
// @route   POST /api/tours
const createTour = async (req, res) => {
  // Note: Images should be handled by middleware before reaching here
  const tourData = req.body; 
  try {
    const newTour = await Tour.create(tourData);
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a tour (Admin)
// @route   DELETE /api/tours/:id
const deleteTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (tour) {
    await tour.deleteOne();
    res.json({ message: 'Tour removed' });
  } else {
    res.status(404).json({ message: 'Tour not found' });
  }
};

module.exports = { getTours, getTourById, createTour, deleteTour };