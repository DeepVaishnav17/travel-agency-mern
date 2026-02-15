const SiteConfig = require('../models/SiteConfig');


const getSiteConfig = async (req, res) => {
  try {

    const config = await SiteConfig.findOne();
    if (!config) {

      return res.json({ banners: [], contactEmail: '', contactPhone: '' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateSiteConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig(req.body);
    } else {

      config.banners = req.body.banners || config.banners;
      config.contactEmail = req.body.contactEmail || config.contactEmail;
      config.contactPhone = req.body.contactPhone || config.contactPhone;
      config.contactPhone = req.body.contactPhone || config.contactPhone;
      config.contactAddress = req.body.contactAddress || config.contactAddress;
      config.homeLayout = req.body.homeLayout || config.homeLayout;
    }
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSiteConfig, updateSiteConfig };