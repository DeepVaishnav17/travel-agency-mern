const Tour = require('../models/Tour');


const getTours = async (req, res) => {
  try {
    const { search } = req.query;


    let query = {};


    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { destination: { $regex: search, $options: "i" } }
        ]
      };
    }


    const tours = await Tour.find(query).sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (tour) res.json(tour);
    else res.status(404).json({ message: 'Tour not found' });
  } catch (error) {
    res.status(404).json({ message: 'Tour not found' });
  }
};


const createTour = async (req, res) => {
  const tourData = req.body;
  console.log('[TourController] Creating Tour with data:', JSON.stringify(tourData, null, 2));

  try {
    const newTour = await Tour.create(tourData);
    console.log('[TourController] Tour Created Success:', newTour._id);
    res.status(201).json(newTour);
  } catch (error) {
    console.error('[TourController] Create Failed:', error.message);
    res.status(400).json({ message: error.message });
  }
};


const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
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