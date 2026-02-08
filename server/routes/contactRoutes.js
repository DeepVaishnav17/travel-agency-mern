const express = require('express');
const { submitContact, getAllContacts } = require('../controllers/contactController');
const { checkAdminKey } = require('../middleware/adminAuth'); // Protect the GET route
const router = express.Router();

router.post('/', submitContact);
router.get('/', checkAdminKey, getAllContacts); // Only Admin can see messages

module.exports = router;