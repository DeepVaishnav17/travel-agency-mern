const express = require('express');
const { submitContact, getAllContacts } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware'); // Protect the GET route
const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, admin, getAllContacts); // Only Admin can see messages

module.exports = router;