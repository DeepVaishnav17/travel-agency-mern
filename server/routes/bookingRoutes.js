const express = require('express');
const { createBooking, getAllBookings, updateStatus } = require('../controllers/bookingController');

const { checkAdminKey } = require('../middleware/adminAuth');

const router = express.Router();


router.post('/', createBooking);


router.get('/', checkAdminKey, getAllBookings);
router.put('/:id', checkAdminKey, updateStatus);

module.exports = router;