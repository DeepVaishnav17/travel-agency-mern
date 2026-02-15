const express = require('express');
const { getSiteConfig, updateSiteConfig } = require('../controllers/siteConfigController');
const { checkAdminKey } = require('../middleware/adminAuth');
const router = express.Router();

router.route('/').get(getSiteConfig).put(checkAdminKey, updateSiteConfig);

router.post('/verify', checkAdminKey, (req, res) => {
    res.status(200).json({ success: true, message: "Valid Key" });
});

module.exports = router;