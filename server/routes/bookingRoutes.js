const express = require('express');
const { createBooking, getAllBookings, updateStatus } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Public route to create booking (or protect it if you want only logged in users)
router.post('/', createBooking);

// Admin routes
router.get('/', protect, admin, getAllBookings);
router.put('/:id', protect, admin, updateStatus);

module.exports = router;