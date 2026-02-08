const express = require('express');
const { getSiteConfig, updateSiteConfig } = require('../controllers/siteConfigController');
const { checkAdminKey } = require('../middleware/adminAuth');
const router = express.Router();

router.route('/').get(getSiteConfig).put(checkAdminKey, updateSiteConfig);

module.exports = router;