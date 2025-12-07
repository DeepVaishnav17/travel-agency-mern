const express = require('express');
const { createBooking, getAllBookings, updateStatus } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Route: User sends inquiry
router.post('/', createBooking);

// Admin Routes: View & Update bookings
// (These use 'protect' and 'admin' middleware)
router.get('/', protect, admin, getAllBookings);
router.put('/:id', protect, admin, updateStatus);

module.exports = router;