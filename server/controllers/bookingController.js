const Booking = require('../models/Booking');
const Tour = require('../models/Tour'); 
const { sendBookingEmail, sendAdminBookingAlert } = require('../config/email'); 

// @desc    Create new booking (Inquiry)
// @route   POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { tour, fullName, email, phone, travelDate, travelers, totalPrice } = req.body;

    const newBooking = new Booking({
      ...req.body,
      user: req.user ? req.user._id : null,
      status: 'pending'
    });
    
    await newBooking.save();

    // 🚀 SPEED FIX: We removed 'await' here so the server responds instantly.
    // The emails will send in the background.
    try {
        const tourDetails = await Tour.findById(tour);
        if(tourDetails) {
            // Send to Customer (Background)
            sendBookingEmail(email, tourDetails.title, fullName)
                .catch(err => console.error("User Email Failed:", err.message));
            
            // Send to Admin (Background)
            sendAdminBookingAlert({
                fullName, email, phone,
                tourName: tourDetails.title,
                travelDate, travelers, totalPrice
            }).catch(err => console.error("Admin Email Failed:", err.message));
        }
    } catch (err) {
        console.error("Email setup error:", err.message);
    }

    // Response is sent immediately, not waiting for emails
    res.status(201).json(newBooking);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
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