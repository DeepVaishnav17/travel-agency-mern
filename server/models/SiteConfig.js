const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  // Dynamic Homepage Banners
  banners: [{
    imageUrl: String,
    title: String,
    subtitle: String
  }],
  // Dynamic Contact Details
  contactEmail: String,
  contactPhone: String,
  contactAddress: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);