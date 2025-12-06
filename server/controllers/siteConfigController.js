const SiteConfig = require('../models/SiteConfig');

// @desc    Get site config (Banners, Contact Info)
// @route   GET /api/config
const getSiteConfig = async (req, res) => {
  try {
    // We usually only have one config document
    const config = await SiteConfig.findOne();
    if (!config) {
        // Return defaults if not set yet
        return res.json({ banners: [], contactEmail: '', contactPhone: '' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update site config (Admin)
// @route   PUT /api/config
const updateSiteConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig(req.body);
    } else {
        // Update existing fields
        config.banners = req.body.banners || config.banners;
        config.contactEmail = req.body.contactEmail || config.contactEmail;
        config.contactPhone = req.body.contactPhone || config.contactPhone;
        config.contactAddress = req.body.contactAddress || config.contactAddress;
    }
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSiteConfig, updateSiteConfig };