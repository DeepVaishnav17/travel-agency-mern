const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const { sendBookingEmail, sendAdminBookingAlert } = require('../config/email');


const createBooking = async (req, res) => {
  try {
    const { tour, fullName, email, phone, travelDate, travelers, totalPrice } = req.body;

    const newBooking = new Booking({
      ...req.body,
      status: 'pending'
    });

    await newBooking.save();


    try {
      const tourDetails = await Tour.findById(tour);
      if (tourDetails) {

        sendBookingEmail(email, tourDetails.title, fullName)
          .catch(err => console.error("User Email Failed:", err.message));


        sendAdminBookingAlert({
          fullName, email, phone,
          tourName: tourDetails.title,
          travelDate, travelers, totalPrice
        }).catch(err => console.error("Admin Email Failed:", err.message));
      }
    } catch (err) {
      console.error("Email setup error:", err.message);
    }


    res.status(201).json(newBooking);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tour', 'title price').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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