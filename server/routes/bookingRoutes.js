const express = require('express');
const { createBooking, getAllBookings, updateStatus } = require('../controllers/bookingController');
// ✅ Import 'protect' middleware
const { protect, admin } = require('../middleware/authMiddleware'); 

const router = express.Router();

// ✅ UPDATED: Added 'protect' here. Now only logged-in users can book.
router.post('/', protect, createBooking);

// Admin Routes: View & Update bookings
router.get('/', protect, admin, getAllBookings);
router.put('/:id', protect, admin, updateStatus);

module.exports = router;