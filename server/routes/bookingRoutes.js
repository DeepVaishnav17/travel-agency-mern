const express = require('express');
const { createBooking, getAllBookings, updateStatus } = require('../controllers/bookingController');
// ✅ Import 'protect' middleware
const { checkAdminKey } = require('../middleware/adminAuth');

const router = express.Router();

// Public: Create Booking
router.post('/', createBooking);

// Admin Routes: View & Update bookings
router.get('/', checkAdminKey, getAllBookings);
router.put('/:id', checkAdminKey, updateStatus);

module.exports = router;