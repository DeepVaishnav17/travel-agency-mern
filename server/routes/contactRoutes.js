const express = require('express');
const { submitContact, getAllContacts } = require('../controllers/contactController');
const { checkAdminKey } = require('../middleware/adminAuth');
const router = express.Router();

router.post('/', submitContact);
router.get('/', checkAdminKey, getAllContacts);

module.exports = router;