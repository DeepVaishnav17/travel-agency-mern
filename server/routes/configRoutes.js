const express = require('express');
const { getSiteConfig, updateSiteConfig } = require('../controllers/siteConfigController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getSiteConfig).put(protect, admin, updateSiteConfig);

module.exports = router;