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
  try {
    const tour = await Tour.findById(req.params.id);
    if (tour) res.json(tour);
    else res.status(404).json({ message: 'Tour not found' });
  } catch (error) {
    res.status(404).json({ message: 'Tour not found' });
  }
};

// @desc    Create a tour (Admin)
// @route   POST /api/tours
const createTour = async (req, res) => {
  const tourData = req.body; 
  try {
    const newTour = await Tour.create(tourData);
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a tour (Admin)
// @route   PUT /api/tours/:id
// ✅ THIS IS THE NEW FUNCTION YOU NEEDED
const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Returns the updated document
    );
    
    if (updatedTour) {
      res.json(updatedTour);
    } else {
      res.status(404).json({ message: 'Tour not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a tour (Admin)
// @route   DELETE /api/tours/:id
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (tour) {
      await tour.deleteOne();
      res.json({ message: 'Tour removed' });
    } else {
      res.status(404).json({ message: 'Tour not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTours, getTourById, createTour, updateTour, deleteTour };