const Booking = require('../models/Booking');

// @desc    Create new booking (Inquiry)
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      user: req.user ? req.user._id : null, // Link to user if logged in, else Guest
      status: 'pending' // Default status
    });
    
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    // .populate('tour') fills in the Tour details (Title, Price) automatically
    const bookings = await Booking.find().populate('tour', 'title price').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status (Approve/Reject)
// @route   PUT /api/bookings/:id
const updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking, getAllBookings, updateStatus };